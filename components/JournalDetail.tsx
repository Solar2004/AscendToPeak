/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { JournalArticle } from '../types';

interface JournalDetailProps {
  article: JournalArticle;
  onBack: () => void;
}

const JournalDetail: React.FC<JournalDetailProps> = ({ article, onBack }) => {
  return (
    <div className="min-h-screen bg-[#09090b] animate-fade-in-up">
       {/* Hero Image for Article */}
       <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden">
          <img 
             src={article.image} 
             alt={article.title} 
             className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent"></div>
       </div>

       <div className="max-w-3xl mx-auto px-6 md:px-12 -mt-32 relative z-10 pb-32">
          <div className="bg-[#18181b] p-8 md:p-16 border border-zinc-800 shadow-2xl shadow-black">
             <div className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-8">
                <button 
                  onClick={onBack}
                  className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Back to Logs
                </button>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-600">{article.date}</span>
             </div>

             <h1 className="text-3xl md:text-5xl font-bold text-white mb-12 leading-tight text-center tracking-tight">
               {article.title}
             </h1>

             <div className="prose prose-invert prose-zinc mx-auto font-light leading-loose">
               {article.content}
             </div>
             
             <div className="mt-16 pt-12 border-t border-zinc-800 flex justify-center">
                 <span className="text-lg font-mono font-bold text-zinc-600 uppercase">Ascend to Peak</span>
             </div>
          </div>
       </div>
    </div>
  );
};

export default JournalDetail;