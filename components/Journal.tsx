/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { JOURNAL_ARTICLES } from '../constants';
import { JournalArticle } from '../types';

interface JournalProps {
  onArticleClick: (article: JournalArticle) => void;
}

const Journal: React.FC<JournalProps> = ({ onArticleClick }) => {
  return (
    <section id="journal" className="bg-[#09090b] py-32 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 pb-8 border-b border-zinc-800">
            <div>
                <span className="block text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-600 mb-4">Research Logs</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Community Findings</h2>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {JOURNAL_ARTICLES.map((article) => (
                <div key={article.id} className="group cursor-pointer flex flex-col text-left" onClick={() => onArticleClick(article)}>
                    <div className="w-full aspect-[4/3] overflow-hidden mb-8 bg-zinc-900 border border-zinc-800 relative">
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                        <div className="absolute top-4 left-4 bg-black/70 px-2 py-1 text-[10px] font-mono text-cyan-400 border border-cyan-900">
                            LOG_ID: 00{article.id}
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 text-left">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">{article.date}</span>
                        <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors">{article.title}</h3>
                        <p className="text-zinc-400 font-light leading-relaxed text-sm">{article.excerpt}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;