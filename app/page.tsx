
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Wallet, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-900">

      <Navbar/>

      <main className="px-8 py-20 max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold leading-tight mb-6">
          Rent Trendy Clothes. <br /> Anytime. Anywhere.
        </h2>
        <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
          High-quality, fashion-forward clothing for every occasion. Rent what you need, when you need it — and pay as you use.
        </p>
        <Button className="text-lg px-8 py-6 shadow-xl">
          Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </main>

      <section id="features" className="px-8 py-20 bg-gray-50">
        <h3 className="text-3xl font-semibold text-center mb-12">Why TrendLease?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <Sparkles className="h-10 w-10 text-indigo-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Trendy Collections</h4>
            <p className="text-gray-600">Stay on top of fashion with curated, up-to-date clothing for all styles and events.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <Wallet className="h-10 w-10 text-green-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Pay-As-You-Use</h4>
            <p className="text-gray-600">No subscriptions. Just pay for what you wear, when you wear it.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <ShieldCheck className="h-10 w-10 text-blue-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Quality Guaranteed</h4>
            <p className="text-gray-600">Every piece goes through strict quality checks to ensure a premium experience.</p>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}
