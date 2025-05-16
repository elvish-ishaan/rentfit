"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { DateRange } from "react-day-picker";
import { DateWithRange } from "@/components/DateWithRange";
import { addDays } from "date-fns";
import { toast } from "sonner";
import { availablePincodes } from "@/constants/pincode";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { fetchProductWithId } from "@/app/actions/products";

// Define API Product interface to match the actual API response
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

// Interface for the component's internal state
interface Product {
  id: string;
  name: string;
  rentCost: number;
  image: string;
  description: string;
  availableSizes: string[];
  reviews?: Review[];
}

interface Review {
  user: string;
  rating: number;
  comment: string;
}

export default function ProductDetailPage() {
  const [pincode, setPincode] = useState("");
  const [pincodeValid, setPincodeValid] = useState<null | boolean>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  const router = useRouter();
  const params = useParams();

  const checkPincode = () => {
    if (pincode.length !== 6) {
      toast("Enter a valid 6-digit pincode");
      return;
    }
    setPincodeValid(availablePincodes.includes(pincode));
  };

  const handleRent = () => {
    if (!date?.from || !date?.to || pincodeValid !== true || !selectedSize) {
      toast("Please select date range, size, and check delivery availability.");
      return;
    }

    if (!product) {
      toast("Product information is not available.");
      return;
    }

    const paramData = new URLSearchParams({
      productId: params.productId as string,
      rentedFrom: date.from.toISOString(),
      rentedTo: date.to.toISOString(),
      pincode,
      size: selectedSize,
    });

    router.push(`/explore/${product.id}/checkout?${paramData.toString()}`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetchProductWithId(params.productId as string);
        console.log(res.product?.imageUrl, 'getting res for one product......');
        
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
            reviews: [] // Initialize with empty reviews
          });
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast('Error in fetching product');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [params.productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {product.image ? (
          <div className="relative w-full h-96 md:h-full">
            <Image 
              src={product.image} 
              fill 
              className="object-contain" 
              alt={product.name || "Product image"} 
            />
          </div>
        ) : (
          <div className="bg-gray-200 w-full h-96 flex items-center justify-center">
            <p>Image not available</p>
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">₹{product.rentCost} / day</p>
          <p className="text-gray-700 mb-6">{product.description}</p> 

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Choose Size</h3>
            <div className="flex gap-3 flex-wrap">
              {product.availableSizes?.map((size: string) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className={clsx(
                    "w-12 h-10",
                    selectedSize === size && "border-2 border-black"
                  )}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
            {product.availableSizes?.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">No sizes available</p>
            )}
            {!selectedSize && product.availableSizes?.length > 0 && (
              <p className="text-sm text-red-500 mt-1">Please select a size</p>
            )}
          </div>

          {/* Date Picker */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Select Rental Period</h3>
            <DateWithRange date={date} setDate={setDate} />
          </div>

          {/* Pincode Check */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Check Delivery Availability</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="max-w-xs"
              />
              <Button onClick={checkPincode}>Check</Button>
            </div>
            {pincodeValid === true && (
              <p className="text-green-600 mt-2">Delivery available</p>
            )}
            {pincodeValid === false && (
              <p className="text-red-600 mt-2">Not deliverable to this pincode</p>
            )}
          </div>

          <Button className="w-full py-6 text-lg" onClick={handleRent}>
            Rent Now
          </Button>
        </div>
      </div>

      {/* Reviews section is commented out in the original code */}
    </div>
  );
}