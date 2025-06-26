import { NextRequest, NextResponse } from 'next/server';
import  prismadb  from '@/lib/prismadb'; // Adjust path as needed

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    // Get all orders for this user's email
    const orders = await prismadb.order.findMany({
      where: {
        storeId: params.storeId,
        customerEmail: email,
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log('[ORDERS_USER_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
