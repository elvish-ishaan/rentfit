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
  rentFrom: string | Date;
  rentTo: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersData = async () => {
      setLoading(true);
      try {
        const res = await fetchOrders();
        console.log(res, 'getting orders');

        if (!res) {
          toast.error("No response received from server.");
          return;
        }

        if (res.success && res.orders) {
          setOrders(res.orders || []);
        } else {
          toast.error("Unable to fetch orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Something went wrong while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <p>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You have no orders yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden shadow-sm">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {format(new Date(order.createdAt), "dd MMM yyyy")}
                  </p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-3">
                  <Badge 
                    className={`
                      ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                      ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                    `}
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium mb-1">Rent Period:</p>
                  <p className="text-sm">
                    {format(new Date(order.rentFrom), "dd MMM yyyy")} - {" "}
                    {format(new Date(order.rentTo), "dd MMM yyyy")}
                  </p>
                </div>

                <div className="mb-3">
                  <p className="font-medium">Amount: ₹{order.amount}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium mb-1">Address:</p>
                  <p className="text-sm">
                    {order.landmark}, {order.city}, {order.district}, {order.state} - {order.pincode}
                  </p>
                </div>

                <div className="text-sm">
                  <p className="font-medium mb-1">Phone: {order.phone}</p>
                  {order.alternatePhone && (
                    <p>Alt: {order.alternatePhone}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}