"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const outfits = [
  {
    id: 1,
    name: "Elegant Evening Dress",
    price: 799,
    image: "/images/dress1.jpg",
  },
  {
    id: 2,
    name: "Casual Summer Look",
    price: 499,
    image: "/images/dress2.jpg",
  },
  {
    id: 3,
    name: "Formal Suit Set",
    price: 999,
    image: "/images/dress3.jpg",
  },
  {
    id: 4,
    name: "Street Style Combo",
    price: 599,
    image: "/images/dress4.jpg",
  },
];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredOutfits = outfits.filter((outfit) =>
    outfit.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Explore Outfits</h1>
        <div className="flex justify-center mb-10">
          <Input
            placeholder="Search outfits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredOutfits.length ? (
            filteredOutfits.map((outfit) => (
              <Card key={outfit.id} className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
                <Image src={outfit.image} alt={outfit.name} width={300} height={300} />
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{outfit.name}</h2>
                  <p className="text-gray-700 mb-4">₹{outfit.price} / day</p>
                  <Button onClick={ () => router.push(`/explore/${outfit.id}`) } className="w-full flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" /> Rent Now
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No outfits found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
