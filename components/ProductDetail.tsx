/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const requiresRx = product.category === 'Peptides' || product.category === 'Research' || product.category === 'SARMs';

  return (
    <div className="pt-24 min-h-screen bg-[#09090b] animate-fade-in-up">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Return to Database
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left: Main Image */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-zinc-900 border border-zinc-800 overflow-hidden relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover animate-fade-in-up grayscale contrast-125"
              />
              {requiresRx && (
                  <div className="absolute bottom-0 left-0 right-0 bg-red-900/90 p-4 text-center border-t border-red-500">
                      <span className="text-red-100 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        Strict Medical Prescription Required
                      </span>
                  </div>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center max-w-xl">
             <span className="text-xs font-mono font-bold text-cyan-500 uppercase tracking-widest mb-2">{product.category}</span>
             <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{product.name}</h1>
             <span className="text-2xl font-mono text-zinc-300 mb-8 block">${product.price}</span>
             
             <p className="text-zinc-400 leading-relaxed font-light text-lg mb-8 border-b border-zinc-800 pb-8">
               {product.longDescription || product.description}
             </p>

             <div className="flex flex-col gap-4">
               {requiresRx ? (
                   <div className="p-4 border border-zinc-700 bg-zinc-900/50 mb-4 space-y-4">
                       <label className="block text-xs text-zinc-400 uppercase font-bold">Upload Prescription / License (.PDF)</label>
                       <input type="file" className="block w-full text-sm text-zinc-400
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-xs file:font-semibold
                          file:bg-zinc-800 file:text-cyan-400
                          hover:file:bg-zinc-700
                        "/>
                   </div>
               ) : null}

               <button 
                 onClick={() => onAddToCart(product)}
                 className="w-full py-4 bg-white text-black uppercase tracking-widest text-sm font-bold hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {requiresRx ? 'Submit for Verification' : 'Add to Cart'}
               </button>
               
               <ul className="mt-8 space-y-3 text-sm text-zinc-500 font-mono">
                 {product.features.map((feature, idx) => (
                   <li key={idx} className="flex items-center gap-3">
                     <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
                     {feature}
                   </li>
                 ))}
               </ul>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;