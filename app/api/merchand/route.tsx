
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/prisma/prismaClient';
import { getServerSession } from 'next-auth';


const ProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url(),
  rentCost: z.number().nonnegative(),
  availableSizes: z.array(z.string().min(1)),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body,'getitng body')

    const { productName, description, imageUrl, rentCost, sizes } = body;
    const session = await getServerSession()
    console.log(session,'getting user data')

    if(!session?.user?.email){
      return NextResponse.json({ error: 'Unauthorized', issues: [] }, { status: 401 });
    }

    const product = await prisma.product.create({
      data: {
        userId: session?.user?.id || 'f52bb18b-9d89-433c-8b62-ef79933616f0',
        name: productName,
        description,
        imageUrl,
        rentCost: Number(rentCost),
        availableSizes:sizes,
      },
    });

    console.log(product,'here is product')

    return NextResponse.json({ success: true, data: product });
  } catch (err) {
    console.error('Error creating product:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
