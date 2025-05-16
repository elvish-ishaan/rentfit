"use server"

import { prisma } from "@/prisma/prismaClient"
import { getServerSession } from "next-auth"

export const fetchOrders = async () => {
    try {
        const session = await getServerSession()
        console.log(session?.user,'getting user')
        if(!session?.user){
        return {
            success: false,
            message: 'user unauthenticated'
        }
        }
        //fetching all orders from db
        try {
        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email || ''
            },
            include: {
                orders: true
            }
        })
        console.log(user?.orders,'getting orders')
        return {
  success: true,
  orders: (user?.orders ?? []).map((order) => ({
    ...order,
    rentFrom: order.rentFrom.toISOString(),
    rentTo: order.rentTo.toISOString(),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  })),
};

        } catch (error) {
            console.log(error,'error in fetching orders from db')
        }
    } catch (error) {
        console.log(error,'error in fetching orders')
        return {
            success: false,
            message: 'Internal server error'
        }
    }
}   