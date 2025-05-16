'use client';

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Multiselect } from '@/components/uploads/Multiselect';

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const MerchantProductUpload = () => {
  const [productName, setProductName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [rentCost, setRentCost] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (!productName || !imageUrl || !description || !rentCost || sizes.length === 0) {
      toast('Please fill in all fields.');
      return;
    }

    const payload = {
      productName,
      imageUrl,
      description,
      rentCost,
      sizes,
    };

    try {
      //post this to backend
      const response = await fetch('/api/merchand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if(data.success){
        toast('Product uploaded successfully')
      }
    } catch (error) {
      console.log(error,'getting error')
      toast('Error uploading product')
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-2xl p-6">
        <CardHeader>
          <CardTitle>Upload New Product</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Product Name</Label>
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <Label>Upload Image Link</Label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter product image URL"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
            />
          </div>

          <div>
            <Label>Rent Cost (₹)</Label>
            <Input
              type="number"
              value={rentCost}
              onChange={(e) => setRentCost(e.target.value)}
              placeholder="e.g., 499"
            />
          </div>

          <div>
            <Label>Available Sizes</Label>
            <Multiselect
              options={availableSizes}
              selected={sizes}
              onChange={setSizes}
              placeholder="Select sizes"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Upload Product
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MerchantProductUpload;
