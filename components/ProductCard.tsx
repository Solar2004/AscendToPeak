/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="group flex flex-col gap-4 cursor-pointer" onClick={() => onClick(product)}>
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-900 border border-zinc-800">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
             <div className="border border-cyan-500 px-6 py-2 text-cyan-400 text-xs font-bold uppercase tracking-widest bg-black/50">
                 Access Data
             </div>
        </div>
        
        {/* Janoshik Badge if peptide */}
        {(product.category === 'Peptides' || product.category === 'Research' || product.category === 'SARMs') && (
            <div className="absolute top-4 right-4 bg-green-900/80 border border-green-500/30 text-green-400 text-[10px] font-bold uppercase px-2 py-1 backdrop-blur-md">
                Janoshik Verified
            </div>
        )}
      </div>
      
      <div className="text-left">
        <div className="flex justify-between items-start mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{product.name}</h3>
            <span className="text-sm font-mono text-cyan-400">${product.price}</span>
        </div>
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">{product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;