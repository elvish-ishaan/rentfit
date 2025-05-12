"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const {data: session} = useSession();
  const router = useRouter();
  
  //handle login
  const handleLogin = () => {
    router.push('/auth/sign-in')
  };
  
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">rentfit</h1>

      <nav className="hidden md:flex space-x-6 items-center">
        <Link href="/" className="text-gray-700 hover:text-black transition">Home</Link>
        <Link href="#shop" className="text-gray-700 hover:text-black transition">Shop</Link>
        <Link href="#how-it-works" className="text-gray-700 hover:text-black transition">How It Works</Link>
        <Link href="#contact" className="text-gray-700 hover:text-black transition">Contact</Link>
        {
          !session?.user ? <Button onClick={ handleLogin } variant="default" className="ml-4">Login</Button> :
           <Button variant="default" className="ml-4" onClick={ () => signOut() }>Logout</Button>
        }
      </nav>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="space-y-4 mt-10">
            <Link href="/" className="block text-lg text-gray-700 hover:text-black">Home</Link>
            <Link href="#shop" className="block text-lg text-gray-700 hover:text-black">Shop</Link>
            <Link href="#how-it-works" className="block text-lg text-gray-700 hover:text-black">How It Works</Link>
            <Link href="#contact" className="block text-lg text-gray-700 hover:text-black">Contact</Link>
            <Button className="w-full mt-4">Login</Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
