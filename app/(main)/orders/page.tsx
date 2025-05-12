"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { fetchOrders } from "@/app/actions/orders";
import { toast } from "sonner";


interface Order {
  id: string;
  productId: string;
  userId: string;
  amount: number;
  status: string;
  pincode: number;
  city: string;
  district: string;
  state: string;
  phone: number;
  alternatePhone: number | null;
  landmark: string;
  rentFrom: string;
  rentTo: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const res = await fetchOrders();
      console.log(res,'getting orders')
      if(!res.success){
        toast("unable to fetch orders")
      } else {
        setOrders(res?.orders || [])
      }
    };
    console.log('calling fetchordes')
    fetchOrdersData()
  },[])
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>

        {orders?.length === 0 ? (
          <p className="text-gray-600">You have no orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders?.map((order) => (
              <Card key={order.id} className="p-6 space-y-3 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</h2>
                    <p className="text-sm text-gray-500">
                      Placed on {format(new Date(order.createdAt), "dd MMM yyyy")}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Delivered"
                        ? "bg-green-600"
                        : "bg-gray-400"
                    } text-white`}
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p><span className="font-medium">Rent Period:</span><br />
                      {format(new Date(order.rentFrom), "dd MMM yyyy")} -{" "}
                      {format(new Date(order.rentTo), "dd MMM yyyy")}
                    </p>
                  </div>
                  <div>
                    <p><span className="font-medium">Amount:</span> ₹{order.amount}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Address:</span><br />
                      {order.landmark}, {order.city}, {order.district}, {order.state} - {order.pincode}
                    </p>
                  </div>
                  <div>
                    <p><span className="font-medium">Phone:</span> {order.phone}</p>
                    {order.alternatePhone && <p><span className="font-medium">Alt:</span> {order.alternatePhone}</p>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
