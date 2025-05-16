"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchAllProducts } from "../actions/products";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface ApiProduct {
  id: string;
  name: string;
  rentCost: number;
  imageUrl: string;
  description: string;
  createdAt: Date;
  userId: string;
  updatedAt: Date;
  availableSizes: string[];
}

interface Outfit {
  id: string;
  name: string;
  rentCost: number;
  image: string;
  description: string;
  reviews: Review[];
}

interface Review {
  user: string;
  rating: number;
  comment: string;
}

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    //checking if user is authenticated
    if (!session?.user) {
      router.push("/auth/sign-in");
    }
  }, []);

  const filteredOutfits = outfits.filter((outfit) =>
    outfit.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetchAllProducts();
        console.log(res, 'getting outfit res');

        if (!res?.success) {
          toast('Error in fetching products');
          return;
        }
        
        if (res?.products) {
          // Map the API product structure to the Outfit structure
          const mappedOutfits: Outfit[] = res.products.map((product: ApiProduct) => ({
            id: product.id,
            name: product.name,
            rentCost: product.rentCost,
            image: product.imageUrl, // Map imageUrl to image
            description: product.description,
            reviews: [] // Initialize with empty reviews array
          }));
          setOutfits(mappedOutfits);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast('Error in fetching products');
      }
    };

    fetchProducts();
  }, []);

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
          {filteredOutfits.length > 0 ? (
            filteredOutfits.map((outfit) => (
              <Card key={outfit.id} className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
                {outfit.image && (
                  <div className="relative w-full h-64">
                    <Image 
                      src={outfit.image} 
                      alt={outfit.name || "Outfit image"} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{outfit.name}</h2>
                  <p className="text-gray-700 mb-4">₹{outfit.rentCost} / day</p>
                  <Button 
                    onClick={() => router.push(`/explore/${outfit.id}`)} 
                    className="w-full flex items-center justify-center gap-2"
                  >
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