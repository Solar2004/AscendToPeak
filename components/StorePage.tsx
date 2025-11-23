
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface StorePageProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const filterOptions = [
    { id: 'Peptides', label: 'Peptides' },
    { id: 'SARMs', label: 'SARMs / Research' },
    { id: 'Coaching', label: 'Consultation' },
    { id: 'Software', label: 'Software' }
];

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
type ViewMode = 'grid' | 'list';

const StorePage: React.FC<StorePageProps> = ({ onBack, onProductClick, cartCount, onOpenCart }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(catId)) {
        return prev.filter(c => c !== catId);
      } else {
        return [...prev, catId];
      }
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search Logic
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        result = result.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    }

    // Category Logic
    if (selectedCategories.length > 0) {
        result = result.filter(p => {
            return selectedCategories.some(catId => {
                if (catId === 'SARMs') {
                    return p.category === 'SARMs' || p.category === 'Research';
                }
                return p.category === catId;
            });
        });
    }

    // Sort Logic
    switch (sortOption) {
        case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'featured':
        default:
            // Default order from constants
            break;
    }

    return result;
  }, [selectedCategories, searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      {/* Store Header */}
      <div className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-xl border-b border-zinc-800">
          <div className="flex items-center justify-between px-6 md:px-12 py-6 max-w-[1800px] mx-auto">
             <div className="flex items-center gap-6">
                <button 
                  onClick={onBack}
                  className="group flex items-center justify-center w-10 h-10 border border-zinc-800 hover:border-zinc-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-400 group-hover:text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-widest uppercase">Global Requisition</h1>
                    <span className="text-[10px] text-cyan-500 font-mono">DATABASE_ACCESS_GRANTED</span>
                </div>
             </div>

             <div className="flex items-center gap-6">
                 <button 
                    onClick={onOpenCart}
                    className="text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors flex items-center gap-2 text-white"
                 >
                    <span>Cart</span>
                    <span className="bg-zinc-800 px-2 py-0.5 rounded text-cyan-400">[{cartCount}]</span>
                 </button>
             </div>
          </div>
      </div>

      <div className="flex-1 max-w-[1800px] mx-auto w-full flex flex-col md:flex-row">
         
         {/* Sidebar Filters */}
         <div className="w-full md:w-64 lg:w-80 flex-shrink-0 p-6 md:p-12 border-r border-zinc-800/50 bg-[#0c0c0e]">
            <div className="sticky top-32">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Search Matrix</h3>
                
                {/* Search Input */}
                <div className="relative mb-8">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search compounds..." 
                        className="w-full bg-zinc-900 border border-zinc-700 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500 transition-colors font-mono"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>

                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">Categories</h3>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={clearFilters}
                        className={`text-left px-4 py-3 text-sm font-mono border-l-2 transition-all duration-300 flex justify-between items-center ${
                            selectedCategories.length === 0
                            ? 'border-cyan-500 text-white bg-zinc-900'
                            : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                        }`}
                    >
                        Complete Archive
                        {selectedCategories.length === 0 && <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>}
                    </button>
                    
                    {filterOptions.map(cat => {
                        const isSelected = selectedCategories.includes(cat.id);
                        return (
                            <button
                                key={cat.id}
                                onClick={() => toggleCategory(cat.id)}
                                className={`text-left px-4 py-3 text-sm font-mono border-l-2 transition-all duration-300 flex justify-between items-center ${
                                    isSelected
                                    ? 'border-cyan-500 text-white bg-zinc-900'
                                    : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                                }`}
                            >
                                {cat.label}
                                {isSelected && <span className="text-cyan-500 text-xs">✓</span>}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-12 p-6 border border-yellow-900/30 bg-yellow-900/10 rounded">
                    <p className="text-[10px] text-yellow-600 font-mono leading-relaxed">
                        NOTICE: All compounds (Peptides/SARMs) strictly for laboratory research. Not for human consumption.
                    </p>
                </div>
            </div>
         </div>

         {/* Product Grid/List Area */}
         <div className="flex-1 p-6 md:p-12">
            {/* Header: Controls */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-6 border-b border-zinc-800 pb-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {selectedCategories.length === 0 ? 'Full Archive' : 'Filtered Results'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-zinc-500 font-mono">{filteredProducts.length} entries found</p>
                        {(selectedCategories.length > 0 || searchQuery) && (
                            <button onClick={clearFilters} className="text-xs text-red-400 hover:text-red-300 underline underline-offset-4">
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Sort */}
                    <div className="relative group">
                        <select 
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            className="appearance-none bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-widest py-2 pl-4 pr-10 outline-none focus:border-cyan-500 transition-colors cursor-pointer hover:bg-zinc-800"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A-Z</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-zinc-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="flex border border-zinc-700 bg-zinc-900 p-1">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                            </svg>
                        </button>
                        <button 
                             onClick={() => setViewMode('list')}
                             className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <>
                    {viewMode === 'grid' ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 animate-fade-in-up">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} onClick={onProductClick} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 animate-fade-in-up">
                             {/* List Header */}
                             <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-zinc-600 border-b border-zinc-800/50">
                                 <div className="col-span-1">Img</div>
                                 <div className="col-span-6">Compound / Item</div>
                                 <div className="col-span-3">Category</div>
                                 <div className="col-span-2 text-right">Acquire</div>
                             </div>
                             {filteredProducts.map(product => (
                                <div 
                                    key={product.id} 
                                    onClick={() => onProductClick(product)}
                                    className="group grid grid-cols-12 gap-4 items-center bg-zinc-900/20 border border-zinc-800/50 p-3 hover:bg-zinc-900 hover:border-cyan-900/50 transition-all cursor-pointer"
                                >
                                    <div className="col-span-3 md:col-span-1 aspect-square bg-zinc-900 overflow-hidden border border-zinc-800">
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                                    </div>
                                    <div className="col-span-9 md:col-span-6 flex flex-col justify-center">
                                        <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">{product.name}</h4>
                                        <p className="text-xs text-zinc-500 font-light truncate hidden md:block">{product.tagline}</p>
                                    </div>
                                    <div className="col-span-6 md:col-span-3 hidden md:flex items-center">
                                        <span className="text-[10px] font-mono uppercase border border-zinc-800 px-2 py-1 text-zinc-400 rounded-sm">
                                            {product.category}
                                        </span>
                                    </div>
                                    <div className="col-span-12 md:col-span-2 flex justify-end items-center gap-4 mt-2 md:mt-0">
                                        <span className="font-mono text-cyan-500 text-sm">${product.price}</span>
                                        <button className="hidden md:block w-8 h-8 border border-zinc-700 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:border-cyan-500 transition-colors">
                                            →
                                        </button>
                                    </div>
                                </div>
                             ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="h-64 flex flex-col items-center justify-center border border-zinc-800 border-dashed rounded opacity-50">
                    <span className="text-zinc-500 font-mono">No matching compounds found in database.</span>
                </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default StorePage;
