"use server"

import { prisma } from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";

export const fetchProductWithId = async (id: string) => {
 try {
  //fetch product from db
  const product = await prisma.product.findUnique({
    where: {
      id: id
    }
  })
  if(!product){
    return {
      success: false,
      message: 'No product found'
    }
  }
  return {
    success: true,
    product: product
  }
 } catch (error) {
  console.log(error,'error in fetching product with id from db')
  return {
    success: false,
    message: 'Internal server error'
  }
 }
}

export const fetchAllProducts = async () => {
    try {
        const session = await getServerSession()

        if(!session?.user.email){
            return {
                success: false,
                message: 'user unauthenticated'
            }
        }
        //fetching all products from db
        try {
            const products = await prisma.product.findMany()
            console.log(products,'gettngf all prod')
            if(!products ){
                return {
                    success: false,
                    message: 'No products found'
                }
            }
            return {
                success: true,
                products   
            };

        } catch (error) {
            console.log(error,'error in fetching products from db')
        }
    } catch (error) {
        console.log(error,'error in fetching products')
        return {
            success: false,
            message: 'Internal server error'
        }
    }
}

