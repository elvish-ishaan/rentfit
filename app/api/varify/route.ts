import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getServerSession } from 'next-auth';
import { razorpay } from '@/app/configs/payment';
import { prisma } from '@/prisma/prismaClient';
// import { sendEmail } from '@/lib/mailer';


const generatedSignature = (
 razorpayOrderId: string,
 razorpayPaymentId: string
) => {
 const keySecret = process.env.RAZORPAY_KEY_SECRET as string;
 if (!keySecret) {
  throw new Error(
   'Razorpay key secret is not defined in environment variables.'
  );
 }
 const sig = crypto
  .createHmac('sha256', keySecret)
  .update(razorpayOrderId + '|' + razorpayPaymentId)
  .digest('hex');
 return sig;
};


export async function POST(request: NextRequest) {
 const { orderCreationId, razorpayPaymentId, razorpaySignature } =
  await request.json();

 const signature = generatedSignature(orderCreationId, razorpayPaymentId);
 if (signature !== razorpaySignature) {
  return NextResponse.json(
   { message: 'payment verification failed', isOk: false },
   { status: 400 }
  );
 }
 //get storage order details
 const order = await razorpay.orders.fetch(orderCreationId)
 const session = await getServerSession()

 //add db call to update the user storage
 try {
    const createdorder = await prisma.order.create({
        data: {
            productId: order.notes?.productId as string || '',
            userId: order.notes?.userId as string || '',
            amount: Number( order.amount) / 100,
            status: "Pending",
            pincode: Number(order.notes?.pincode),
            city: order.notes?.city as string || '',
            district: order.notes?.district as string || '',
            state: order.notes?.state as string || '',
            phone: Number(order.notes?.phone),
            alternatePhone: Number(order.notes?.alternatePhone),
            landmark: order.notes?.landmark as string || '',
            rentFrom: order.notes?.rentFrom as string,
            rentTo: order.notes?.rentTo as string
        }
    })
    console.log(createdorder,'order created')
 } catch (error) {
    console.log(error, 'error in creating order at varification')
 }
 //send email to user
//  try {
// //   await sendEmail(session?.user?.name || '', session?.user?.email || '', 'Storage Upgrade Confirmation', order.notes?.plan || '')
//  } catch (error) {
//   console.log(error, 'error in sending email at varification')
//  }

 return NextResponse.json(
  { message: 'payment verified successfully', isOk: true },
  { status: 200 }
 );
}