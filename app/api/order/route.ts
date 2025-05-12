

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid'
import { razorpay } from '@/app/configs/payment'
import { DeliveryDetails } from '@/app/explore/[productId]/checkout/page';

interface PayOptions {
    amount: string;
    currency: string;
    receipt: string;
    notes: NotesData
}

interface NotesData extends DeliveryDetails{
  productId: string;
  userId: string;
} 


export async function POST(request: NextRequest) {
 const { amount, notesData } = (await request.json()) as {
  amount: string;
  currency: string;
  notesData: NotesData;
 };

 const options: PayOptions = {
  amount: amount,
  currency: "INR",
  receipt: `rcp-${uuid().split('-')[0]}`,
  notes: notesData
 };
 //@ts-expect-error fix this
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const order:any = await razorpay.orders.create(options);
 console.log(order,'geeting order details')
 return NextResponse.json({ orderId: order?.id }, { status: 200 });
}