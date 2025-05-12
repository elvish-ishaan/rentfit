// components/Footer.tsx
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-10 px-6 text-gray-700">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-3">rentfit</h2>
          <p className="text-sm text-gray-600">Trendy clothing on rent. Fashion made accessible.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#shop" className="hover:text-black">Shop</Link></li>
            <li><Link href="#how-it-works" className="hover:text-black">How It Works</Link></li>
            <li><Link href="#contact" className="hover:text-black">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-black"><Facebook className="w-5 h-5" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-black"><Instagram className="w-5 h-5" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-black"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-10">
        © {new Date().getFullYear()} rentfit. All rights reserved.
      </div>
    </footer>
  );
}
