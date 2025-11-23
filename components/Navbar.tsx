/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { BRAND_NAME } from '../constants';

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMobileMenuOpen(false);
    onNavClick(e, targetId);
  };

  const handleCartClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      onOpenCart();
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
          scrolled || mobileMenuOpen 
            ? 'bg-[#09090b]/90 backdrop-blur-md py-4 border-white/10' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavClick(e, '');
            }}
            className="text-xl md:text-2xl font-bold tracking-tighter z-50 relative text-white font-sans uppercase"
          >
            ASCEND<span className="text-cyan-500">.PEAK</span>
          </a>
          
          {/* Center Links - Desktop */}
          <div className="hidden md:flex items-center gap-10 text-xs font-medium tracking-[0.2em] uppercase text-zinc-400">
            <a href="#store-page" onClick={(e) => handleLinkClick(e, 'store-page')} className="hover:text-white transition-colors">Store</a>
            <a href="#chronos-page" onClick={(e) => handleLinkClick(e, 'chronos-page')} className="text-cyan-500 hover:text-cyan-300 transition-colors flex items-center gap-1">
              <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></span>
              Chronos AI
            </a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-white transition-colors">Community</a>
            <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')} className="hover:text-white transition-colors">Logs</a>
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
               <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.06 13.06 0 0 0-1.093 2.245.088.088 0 0 0 .032.094 14.26 14.26 0 0 0 4.055 1.59.077.077 0 0 0 .082-.027l.866-1.456a.077.077 0 0 0-.028-.108 19.827 19.827 0 0 0-1.576-.86zm-1.196 13.63a.077.077 0 0 0-.028.108l.87 1.462a.077.077 0 0 0 .082.027 14.26 14.26 0 0 0 4.055-1.59.088.088 0 0 0 .032-.094 13.06 13.06 0 0 0-1.093-2.245.074.074 0 0 0-.079-.037 19.791 19.791 0 0 0-4.885 1.515zM2.05 8.66a.074.074 0 0 0-.078-.037 19.895 19.895 0 0 0-4.852 1.515.077.077 0 0 0 .028.108l.866 1.456a.077.077 0 0 0 .082.027 14.26 14.26 0 0 0 4.055-1.59.088.088 0 0 0 .032-.094 13.06 13.06 0 0 0-1.093-2.245zm1.14 8.88a.088.088 0 0 0 .032.094 14.26 14.26 0 0 0 4.055 1.59.077.077 0 0 0 .082-.027l.87-1.462a.077.077 0 0 0-.028-.108 19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.06 13.06 0 0 0-1.093 2.245zM5.68 19.63C1.5 15.46 0 10.22 0 5.5v-.5a.5.5 0 0 1 .5-.5h23a.5.5 0 0 1 .5.5v.5c0 4.72-1.5 9.96-5.68 14.13-4.18 4.17-9.42 5.67-14.14 5.67S-2.5 23.8-5.68 19.63z" fill="currentColor"/></svg>
               Discord
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 z-50 relative">
            <button 
              onClick={handleCartClick}
              className="text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors hidden sm:flex items-center gap-2 text-white"
            >
              <span>Cart</span>
              <span className="bg-zinc-800 px-2 py-0.5 rounded text-cyan-400">[{cartCount}]</span>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="block md:hidden focus:outline-none text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
               {mobileMenuOpen ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                 </svg>
               )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-zinc-950 z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}>
          <div className="flex flex-col items-center space-y-8 text-lg font-bold uppercase tracking-widest text-white">
            <a href="#store-page" onClick={(e) => handleLinkClick(e, 'store-page')} className="hover:text-cyan-400 transition-colors">Store</a>
            <a href="#chronos-page" onClick={(e) => handleLinkClick(e, 'chronos-page')} className="text-cyan-500 hover:text-cyan-300 transition-colors">Chronos AI</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-cyan-400 transition-colors">Community</a>
            <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')} className="hover:text-cyan-400 transition-colors">Logs</a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-indigo-400">Discord</a>
            <button 
                onClick={handleCartClick} 
                className="text-sm mt-8 border border-zinc-700 px-6 py-3 hover:bg-zinc-800 transition-colors"
            >
                Access Cart ({cartCount})
            </button>
          </div>
      </div>
    </>
  );
};

export default Navbar;