/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-[#050505] pt-24 pb-12 px-6 text-zinc-400 border-t border-zinc-900">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        <div className="md:col-span-4">
          <h4 className="text-xl font-bold text-white mb-6 uppercase tracking-tighter">Ascend to Peak</h4>
          <p className="max-w-xs font-light leading-relaxed text-sm">
            Research community dedicated to the optimization of the human form.
            Data-driven. Medically supervised.
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-bold text-white mb-6 tracking-widest text-xs uppercase">Database</h4>
          <ul className="space-y-4 font-light text-sm font-mono">
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-cyan-400 transition-colors">Peptides</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-cyan-400 transition-colors">Coaching</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-cyan-400 transition-colors">Software</a></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-bold text-white mb-6 tracking-widest text-xs uppercase">Community</h4>
          <ul className="space-y-4 font-light text-sm font-mono">
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-cyan-400 transition-colors">Mission</a></li>
            <li><a href="#journal" onClick={(e) => onLinkClick(e, 'journal')} className="hover:text-cyan-400 transition-colors">Research Logs</a></li>
            <li><a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">Discord Server</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-bold text-white mb-6 tracking-widest text-xs uppercase">Waitlist</h4>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="Enter email for access..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              className="bg-transparent border-b border-zinc-700 py-2 text-sm outline-none focus:border-cyan-500 transition-colors placeholder-zinc-700 text-white disabled:opacity-50 font-mono" 
            />
            <button 
              onClick={handleSubscribe}
              disabled={subscribeStatus !== 'idle' || !email}
              className="self-start text-xs font-bold uppercase tracking-widest mt-2 hover:text-cyan-400 disabled:cursor-default disabled:hover:text-zinc-500 disabled:opacity-50 transition-opacity text-white"
            >
              {subscribeStatus === 'idle' && 'Request Access'}
              {subscribeStatus === 'loading' && 'Verifying...'}
              {subscribeStatus === 'success' && 'Added to Queue'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest opacity-40 font-mono">
        <p>© 2025 ASCEND TO PEAK RESEARCH GROUP.</p>
        <p>DISCLAIMER: RESEARCH PURPOSES ONLY. NOT MEDICAL ADVICE.</p>
      </div>
    </footer>
  );
};

export default Footer;