"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { fetchProductWithId } from "@/app/actions/products";
import { useSearchParams } from "next/navigation";

// Declare Razorpay globally
declare global {
    interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
     Razorpay: any;
    }
  }

export interface DeliveryDetails {
  name: string;
  phone: string;
  altPhone: string;
  pincode: string;
  landmark: string;
  city: string;
  district: string;
  state: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  reviews: Review[];
}

interface Review {
  user: string;
  rating: number;
  comment: string;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const rentFrom = searchParams.get('rentedFrom');
  const rentTo = searchParams.get('rentedTo');

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    name: "",
    phone: "",
    altPhone: "",
    pincode: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
  });     
  const {data: session} = useSession();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(()=>{
    //call the action
    async function fetchProduct() {
      const res = await fetchProductWithId("1");
      if(!res.success){
        toast('error in fetching product')
        return
      }
      setProduct(res?.product || null)
    }
    fetchProduct()
  },[])

  //creating order
  const createOrderId = async (deliveryDetails: DeliveryDetails, cost: number) => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: cost * 100,
          notesData:{
            ...deliveryDetails,
            rentFrom,
            rentTo,
            productId: product?.id,
            userId: session?.user?.id
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  };

  const handlePayment = () => {
    if (!deliveryDetails.name || !deliveryDetails.phone || !deliveryDetails.pincode || !deliveryDetails.city || !deliveryDetails.district || !deliveryDetails.state) {
      toast('Please fill in all required fields.');
      return;
    }
    //process payment
    const processPayment = async (deliveryDetails: DeliveryDetails, amount: number) => {
      try {
    const orderId = await createOrderId(deliveryDetails, amount);
    if (!orderId || !window.Razorpay) return;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "RentFit",
      description: "payment for rentfit",
      order_id: orderId,
      notes: {
        deliveryDetails: deliveryDetails
      },
      handler: async (response: {
        razorpay_payment_id: string,
        razorpay_order_id:string,
        razorpay_signature: string,
      }) => {
        const data = {
          orderCreationId: orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        const result = await fetch("/api/varify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const res = await result.json();
         //show user taost for sucessful payment
         if(res.isOk){
          //update the user storage on client side also
          toast('payment successfull')
          router.push('/explore')   
         }else{
          toast("payment failed")
         }
      },
      prefill: { name: session?.user?.name, email: session?.user?.email },
      theme: { color: "#000000" },
    };

    const paymentObject = new window.Razorpay(options);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paymentObject.on("payment.failed", (response: any) => {
     toast(response.error.description)
    });
    paymentObject.open();
      } catch (error) {
        console.error("Payment error:", error);
      }
    };

    //calling payment function
    if(!product){
      return
    }
    processPayment(deliveryDetails, product?.price);

  };
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <Input placeholder="Your name" value={deliveryDetails.name} onChange={(e) => setDeliveryDetails({...deliveryDetails, name: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <Input placeholder="Primary phone number" value={deliveryDetails.phone} onChange={(e) => setDeliveryDetails({...deliveryDetails, phone: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Alternate Phone Number</label>
          <Input placeholder="Alternate phone number (optional)" value={deliveryDetails.altPhone} onChange={(e) => setDeliveryDetails({...deliveryDetails, altPhone: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pincode</label>
          <Input placeholder="Pincode" value={deliveryDetails.pincode} onChange={(e) => setDeliveryDetails({...deliveryDetails, pincode: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Landmark</label>
          <Input placeholder="Nearby landmark" value={deliveryDetails.landmark} onChange={(e) => setDeliveryDetails({...deliveryDetails, landmark: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <Input placeholder="City" value={deliveryDetails.city} onChange={(e) => setDeliveryDetails({...deliveryDetails, city: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">District</label>
          <Input placeholder="District" value={deliveryDetails.district} onChange={(e) => setDeliveryDetails({...deliveryDetails, district: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <Input placeholder="State" value={deliveryDetails.state} onChange={(e) => setDeliveryDetails({...deliveryDetails, state: e.target.value})} />
        </div>

        <Button className="w-full py-6 text-lg" onClick={handlePayment}>
          Pay & Confirm Rental
        </Button>
      </div>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => console.log("Razorpay script loaded")}
      />
    </div>
  );
}
