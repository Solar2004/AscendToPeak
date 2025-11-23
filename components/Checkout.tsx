/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { Product } from '../types';

interface CheckoutProps {
  items: Product[];
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const shipping = 15; 
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-[#09090b] animate-fade-in-up text-zinc-300">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Database
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Form */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Secure Checkout</h1>
            <p className="text-sm text-zinc-500 mb-12 border-l-2 border-cyan-500 pl-4">This is a sample interface. Payment processing is disabled.</p>
            
            <div className="space-y-12">
              {/* Section 1: Contact */}
              <div>
                <h2 className="text-lg font-bold text-white mb-6">Researcher Information</h2>
                <div className="space-y-4">
                   <input type="email" placeholder="Secure Email address" className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500 transition-colors cursor-not-allowed" disabled />
                   <div className="flex items-center gap-2">
                     <input type="checkbox" id="newsletter" className="accent-cyan-500 cursor-not-allowed" disabled />
                     <label htmlFor="newsletter" className="text-sm text-zinc-500 cursor-not-allowed">Opt-in for Janoshik testing updates</label>
                   </div>
                </div>
              </div>

              {/* Section 2: Shipping */}
              <div>
                <h2 className="text-lg font-bold text-white mb-6">Laboratory Address</h2>
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="First name" className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500 transition-colors cursor-not-allowed" disabled />
                      <input type="text" placeholder="Last name" className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500 transition-colors cursor-not-allowed" disabled />
                   </div>
                   <input type="text" placeholder="Address" className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500 transition-colors cursor-not-allowed" disabled />
                   <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="City" className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500 transition-colors cursor-not-allowed" disabled />
                      <input type="text" placeholder="Postal code" className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500 transition-colors cursor-not-allowed" disabled />
                   </div>
                </div>
              </div>

               {/* Section 3: Payment (Mock) */}
              <div>
                <h2 className="text-lg font-bold text-white mb-6">Crypto / Card</h2>
                <div className="p-6 border border-zinc-800 bg-zinc-900/30 space-y-4">
                   <p className="text-xs font-mono text-zinc-500 mb-2">TRANSACTIONS ENCRYPTED VIA AES-256.</p>
                   <input type="text" placeholder="Card number" className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500 transition-colors cursor-not-allowed" disabled />
                   <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Expiration (MM/YY)" className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500 transition-colors cursor-not-allowed" disabled />
                      <input type="text" placeholder="CVC" className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500 transition-colors cursor-not-allowed" disabled />
                   </div>
                </div>
              </div>

              <div>
                <button 
                    disabled
                    className="w-full py-5 bg-zinc-800 text-zinc-400 uppercase tracking-widest text-sm font-bold cursor-not-allowed border border-zinc-700 hover:border-red-500 transition-colors"
                >
                    Process Transaction — ${total}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:pl-12 lg:border-l border-zinc-800">
            <h2 className="text-lg font-bold text-white mb-8">Requisition Summary</h2>
            
            <div className="space-y-6 mb-8">
               {items.map((item, idx) => (
                 <div key={idx} className="flex gap-4">
                    <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 relative">
                       <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale" />
                       <span className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-600 text-white text-[10px] flex items-center justify-center rounded-full">1</span>
                    </div>
                    <div className="flex-1">
                       <h3 className="font-bold text-white text-sm">{item.name}</h3>
                       <p className="text-[10px] font-mono text-zinc-500 uppercase">{item.category}</p>
                    </div>
                    <span className="text-sm font-mono text-cyan-400">${item.price}</span>
                 </div>
               ))}
            </div>

            <div className="border-t border-zinc-800 pt-6 space-y-2">
              <div className="flex justify-between text-sm text-zinc-500">
                 <span>Subtotal</span>
                 <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-zinc-500">
                 <span>Insured Shipping</span>
                 <span>${shipping}</span>
              </div>
            </div>
            
            <div className="border-t border-zinc-800 mt-6 pt-6">
               <div className="flex justify-between items-center">
                 <span className="font-bold text-xl text-white">Total</span>
                 <div className="flex items-end gap-2">
                   <span className="text-xs text-zinc-500 mb-1">USD</span>
                   <span className="font-mono text-2xl text-cyan-400">${total}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;