import { NextResponse } from "next/server";
import paystack from "@/lib/paystack";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.FRONTEND_STORE_URL || "http://192.168.13.163:3001",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json"
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { productIds, customerEmail } = await req.json();

    // Validate inputs
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store ID is required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!productIds?.length) {
      return new NextResponse(
        JSON.stringify({ error: "Product IDs are required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!customerEmail || !/^\S+@\S+\.\S+$/.test(customerEmail)) {
      return new NextResponse(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Get products
    const products = await prismadb.product.findMany({
      where: { id: { in: productIds }, isArchived: false }
    });

    if (products.length !== productIds.length) {
      return new NextResponse(
        JSON.stringify({ error: "Some products not found" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Calculate amount
    const amount = products.reduce((total, product) => 
      total + product.price.toNumber() * 100, 0);

    // Create order
    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        customerEmail,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: { connect: { id: productId } }
          }))
        }
      }
    });

    // Initialize Paystack payment
    const paystackResponse = await paystack.initializeTransaction({
      amount,
      email: customerEmail,
      currency: "KES",
      reference: `order_${order.id}_${Date.now()}`,
      metadata: {
        orderId: order.id,
        storeId: params.storeId
      }
    });

    if (!paystackResponse.status || !paystackResponse.data?.authorization_url) {
      await prismadb.order.delete({ where: { id: order.id } });
      throw new Error("Payment initialization failed");
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        authorization_url: paystackResponse.data.authorization_url,
        reference: paystackResponse.data.reference,
        email: customerEmail,
        amount,
        orderId: order.id
      }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error("Checkout error:", error);
    return new NextResponse(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : "Payment failed"
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}