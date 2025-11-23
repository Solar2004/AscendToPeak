/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';

const categories = ['All', 'Peptides', 'SARMs', 'Coaching', 'Software', 'Research'];

interface ProductGridProps {
  onProductClick: (product: Product) => void;
  onViewFullArchive?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick, onViewFullArchive }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="products" className="py-32 px-6 md:px-12 bg-[#0c0c0e]">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-24 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Research Database</h2>
          <p className="text-zinc-400 max-w-2xl text-sm md:text-base">
            Verified compounds, expert supervision, and analytical software for biological research.
          </p>
          
          {/* Minimal Filter */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 w-full max-w-2xl">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' 
                    : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Large Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>
        
        {onViewFullArchive && (
             <div className="mt-24 flex justify-center">
                 <button 
                    onClick={onViewFullArchive}
                    className="group border-b border-zinc-700 pb-1 text-sm text-zinc-500 uppercase tracking-widest hover:text-white hover:border-white transition-all"
                 >
                    Enter Full Archive
                    <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                 </button>
             </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;