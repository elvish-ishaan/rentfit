"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Wallet, ShieldCheck, Heart, ChevronRight, Star, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navs/Navbar";




// Step Card Component
const StepCard = ({ number, title, description }:{ number: number, title: string, description: string }) => {
  return (
    <div className="relative">
      <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-indigo-600 mb-4">
        {number}
      </div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
      {number < 4 && (
        <div className="hidden md:block absolute top-6 left-full w-16 border-t-2 border-dashed border-indigo-200" />
      )}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ name, role, quote, rating }:{ name: string, role: string, quote: string, rating: number }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      <p className="text-gray-600 italic mb-6">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
        <div>
          <h5 className="font-medium">{name}</h5>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

// Newsletter Component
const Newsletter = () => {
  return (
    <div className="bg-indigo-100 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4">Join Our Style Community</h3>
        <p className="text-lg text-gray-600 mb-8">Get exclusive offers, style tips, and new collection notifications before anyone else.</p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button className="bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap">
            Subscribe <Mail className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-2xl font-bold mb-4">RentFit</h4>
            <p className="text-gray-400">Rent trendy clothes anytime, anywhere. Fashion that fits your lifestyle without the commitment.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-4 text-lg">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#collections" className="text-gray-400 hover:text-white transition-colors">Collections</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4 text-lg">Help & Support</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4 text-lg">Legal</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RentFit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
    const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <main className="px-4 md:px-8 py-20 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl opacity-70 transform -skew-y-3"></div>
        <div className="relative">
          <span className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
            Fashion Rental Made Simple
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Rent Trendy Clothes. <br /> Anytime. Anywhere.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            High-quality, fashion-forward clothing for every occasion. Rent what you need, when you need it — and pay as you use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => { router.push('/explore') }} className="text-lg px-8 py-6 bg-indigo-600 hover:bg-indigo-700 shadow-xl">
              Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button className="text-lg px-8 py-6 bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50">
              How It Works
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">No credit card required to browse. Sign up for free.</p>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="px-4 md:px-8 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-semibold text-center mb-4">Why RentFit?</h3>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We're changing how you access fashion with our innovative rental platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-md text-center transition-transform hover:scale-105">
              <Sparkles className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Trendy Collections</h4>
              <p className="text-gray-600">Stay on top of fashion with curated, up-to-date clothing for all styles and events. New arrivals every week.</p>
              <a href="/explore" className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                View Collections <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md text-center transition-transform hover:scale-105">
              <Wallet className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Pay-As-You-Use</h4>
              <p className="text-gray-600">No subscriptions. Just pay for what you wear, when you wear it. Daily and weekly rental options to fit your needs.</p>
              <a href="#pricing" className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                See Pricing <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md text-center transition-transform hover:scale-105">
              <ShieldCheck className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Quality Guaranteed</h4>
              <p className="text-gray-600">Every piece goes through strict quality checks and professional cleaning to ensure a premium experience every time.</p>
              <a href="#" className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                Our Promise <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold mb-4">Featured Collections</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our hand-picked selection of designer clothes for every occasion.
            </p>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              View All Collections
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 md:px-8 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold mb-4">How RentFit Works</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Renting has never been easier. Follow these simple steps to upgrade your wardrobe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <StepCard 
              number={1}
              title="Browse & Select"
              description="Explore our collections and pick items you love."
            />
            <StepCard 
              number={2}
              title="Book Your Dates"
              description="Choose when you want to receive and return the items."
            />
            <StepCard 
              number={3}
              title="Wear & Enjoy"
              description="Your items arrive clean and ready to wear. Enjoy!"
            />
            <StepCard 
              number={4}
              title="Easy Return"
              description="Use our prepaid shipping label to return your items."
            />
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-4 md:px-8 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold mb-4">What Our Customers Say</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our community thinks about RentFit.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TestimonialCard 
              name="Emily Johnson"
              role="Marketing Director"
              quote="RentFit has completely transformed how I dress for important meetings. The quality and selection is outstanding."
              rating={5}
            />
            <TestimonialCard 
              name="Michael Chen"
              role="Software Engineer"
              quote="As someone who hates shopping, this service is a lifesaver. I can get great clothes without the commitment."
              rating={4}
            />
            <TestimonialCard 
              name="Sarah Williams"
              role="Event Planner"
              quote="I use RentFit for all my special occasions. It's affordable and I never have to worry about repeat outfits."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* CTA Section */}
      <section className="px-4 md:px-8 py-16 bg-indigo-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Upgrade Your Wardrobe?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of fashion-forward individuals who have already transformed their closets with RentFit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-6">
              Sign Up Now
            </Button>
            <Button className="bg-transparent border border-white hover:bg-indigo-700 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}