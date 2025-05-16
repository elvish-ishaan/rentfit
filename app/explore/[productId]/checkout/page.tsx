"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { fetchProductWithId } from "@/app/actions/products";
import { useRouter, useSearchParams } from "next/navigation";

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

// API Product interface to match the actual API response
interface ApiProduct {
  id: string;
  name: string;
  rentCost: number;
  imageUrl: string;
  description: string;
  availableSizes: string[];
  createdAt: Date;
  userId: string;
  updatedAt: Date;
}

// Product interface for component state
interface Product {
  id: string;
  name: string;
  rentCost: number;
  image: string;
  description: string;
  availableSizes: string[];
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const rentFrom = searchParams.get('rentedFrom');
  const rentTo = searchParams.get('rentedTo');
  const productId = searchParams.get('productId');
  const selectedSize = searchParams.get('size');

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    name: "",
    phone: "",
    altPhone: "",
    pincode: searchParams.get('pincode') || "",
    landmark: "",
    city: "",
    district: "",
    state: "",
  });

  const { data: session } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    //call the action
    async function fetchProduct() {
      if (!productId) {
        toast('Product ID is missing');
        router.push('/explore');
        return;
      }
      
      setIsLoading(true);
      try {
        const res = await fetchProductWithId(productId);
        
        if (!res?.success) {
          toast('Error in fetching product');
          return;
        }
        
        if (res?.product) {
          // Map API response to Product interface
          setProduct({
            id: res.product.id,
            name: res.product.name,
            rentCost: res.product.rentCost,
            image: res.product.imageUrl, // Map imageUrl to image
            description: res.product.description,
            availableSizes: res.product.availableSizes || [],
          });
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast('Error in fetching product');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProduct();
  }, [productId, router]);

  // Calculate rental period in days
  const calculateRentalDays = (): number => {
    if (!rentFrom || !rentTo) return 0;
    
    const startDate = new Date(rentFrom);
    const endDate = new Date(rentTo);
    
    // Calculate the difference in milliseconds
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    // Convert to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Calculate total cost
  const calculateTotalCost = (): number => {
    if (!product) return 0;
    const days = calculateRentalDays();
    return product.rentCost * days;
  };

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
          notesData: {
            ...deliveryDetails,
            rentFrom,
            rentTo,
            size: selectedSize,
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
      toast('Failed to create order');
      return null;
    }
  };

  const handlePayment = () => {
    if (!deliveryDetails.name || !deliveryDetails.phone || !deliveryDetails.pincode || !deliveryDetails.city || !deliveryDetails.district || !deliveryDetails.state) {
      toast('Please fill in all required fields.');
      return;
    }

    if (!product) {
      toast('Product information is missing');
      return;
    }

    if (!rentFrom || !rentTo) {
      toast('Rental period is missing');
      return;
    }

    if (!selectedSize) {
      toast('Size selection is missing');
      return;
    }

    //process payment
    const processPayment = async (deliveryDetails: DeliveryDetails, amount: number) => {
      try {
        const orderId = await createOrderId(deliveryDetails, amount);
        if (!orderId) {
          toast('Failed to create order');
          return;
        }
        
        if (!window.Razorpay) {
          toast('Payment gateway not loaded properly');
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: "INR",
          name: "RentFit",
          description: `Rental payment for ${product.name} (${selectedSize})`,
          order_id: orderId,
          notes: {
            deliveryDetails: JSON.stringify(deliveryDetails),
            productId: product.id,
            rentalPeriod: `${rentFrom} to ${rentTo}`,
            size: selectedSize
          },
          handler: async (response: {
            razorpay_payment_id: string,
            razorpay_order_id: string,
            razorpay_signature: string,
          }) => {
            const data = {
              orderCreationId: orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            
            try {
              const result = await fetch("/api/varify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              const res = await result.json();
              
              if (res.isOk) {
                toast('Payment successful');
                router.push('/explore');
              } else {
                toast("Payment verification failed");
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              toast("Payment verification failed");
            }
          },
          prefill: { 
            name: session?.user?.name || deliveryDetails.name, 
            email: session?.user?.email || '',
            contact: deliveryDetails.phone
          },
          theme: { color: "#000000" },
        };

        const paymentObject = new window.Razorpay(options);
        
        paymentObject.on("payment.failed", (response: any) => {
          toast(response.error.description || "Payment failed")
        });
        
        paymentObject.open();
      } catch (error) {
        console.error("Payment error:", error);
        toast("Payment processing failed");
      }
    };

    // Calculate total cost based on rental days
    const totalCost = calculateTotalCost();
    
    if (totalCost <= 0) {
      toast('Invalid rental cost');
      return;
    }
    
    // Call payment function with correct cost
    processPayment(deliveryDetails, totalCost);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading checkout information...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4">Product information not available.</p>
        <Button onClick={() => router.push('/explore')}>Return to Explore</Button>
      </div>
    );
  }

  const rentalDays = calculateRentalDays();
  const totalCost = calculateTotalCost();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Product:</span>
            <span className="font-medium">{product.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Size:</span>
            <span className="font-medium">{selectedSize}</span>
          </div>
          <div className="flex justify-between">
            <span>Rental Period:</span>
            <span className="font-medium">{rentalDays} days</span>
          </div>
          <div className="flex justify-between">
            <span>Daily Rate:</span>
            <span className="font-medium">₹{product.rentCost}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
            <span>Total:</span>
            <span>₹{totalCost}</span>
          </div>
        </div>
      </div>

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
          Pay ₹{totalCost} & Confirm Rental
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