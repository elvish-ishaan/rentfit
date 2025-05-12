"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import shirtImg from "@/public/shirt.png";
import { DateRange } from "react-day-picker";
import { DateWithRange } from "@/components/DateWithRange";
import { addDays } from "date-fns";
import { toast } from "sonner";
import { availablePincodes } from "@/constants/pincode";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const dummyProduct = {
  id: 1,
  name: "Elegant Evening Dress",
  price: 799,
  image: "/images/dress1.jpg",
  description: "A glamorous dress perfect for formal evenings, with a flowing silhouette and premium fabric.",
  reviews: [
    { user: "Aanya", rating: 5, comment: "Loved it! Looked amazing for my event." },
    { user: "Neha", rating: 4, comment: "Good quality, worth the rent." },
  ],
};

const sizes = ["XS", "S", "M", "L", "XL"];

export default function ProductDetailPage() {
  const [pincode, setPincode] = useState("");
  const [pincodeValid, setPincodeValid] = useState<null | boolean>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  const router = useRouter();

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

    const params = new URLSearchParams({
      productId: dummyProduct.id.toString(),
      rentedFrom: date.from.toISOString(),
      rentedTo: date.to.toISOString(),
      pincode,
      size: selectedSize,
    });

    router.push(`${1}/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <Image src={shirtImg} width={600} height={800} alt="shirt" />

        <div>
          <h1 className="text-3xl font-bold mb-2">{dummyProduct.name}</h1>
          <p className="text-gray-600 mb-4">₹{dummyProduct.price} / day</p>
          <p className="text-gray-700 mb-6">{dummyProduct.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Choose Size</h3>
            <div className="flex gap-3 flex-wrap">
              {sizes.map((size) => (
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
            {!selectedSize && (
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

      {/* Reviews */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-4">
          {dummyProduct.reviews.map((review, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{review.user}</span>
                <div className="flex gap-1 text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
