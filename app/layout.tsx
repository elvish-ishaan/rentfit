import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from "@/app/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentFit - Rent Trendy Clothes Anytime. Anywhere.",
  description: "RentFit is a rental platform that allows users to rent trendy clothes anytime, anywhere. It offers a wide range of products, including t-shirts, hoodies, and more, with a variety of sizes and colors to choose from. Users can easily browse and select items they want to rent, and then book their rentals online. Once rented, users can return the items at any time, and the platform takes care of the rest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <AuthProvider>
           {children}
         </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
