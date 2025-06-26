import { NextRequest, NextResponse } from 'next/server';
import  prismadb  from '@/lib/prismadb'; // Adjust path as needed

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string; orderId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!params.orderId) {
      return new NextResponse("Order ID is required", { status: 400 });
    }

    // Get specific order with all details
    const order = await prismadb.order.findFirst({
      where: {
        id: params.orderId,
        storeId: params.storeId,
        isPaid: true, // Only show paid orders
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
        trackingUpdates: {
          orderBy: {
            timestamp: 'desc',
          },
        },
      },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.log('[ORDER_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}