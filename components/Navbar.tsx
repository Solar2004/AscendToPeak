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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${scrolled || mobileMenuOpen
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
              href="https://discord.gg/vPq93wguyf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.5328-9.6739-3.5816-14.1414a.0647.0647 0 00-.032-.0277zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" /></svg>
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
      <div className={`fixed inset-0 bg-zinc-950 z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}>
        <div className="flex flex-col items-center space-y-8 text-lg font-bold uppercase tracking-widest text-white">
          <a href="#store-page" onClick={(e) => handleLinkClick(e, 'store-page')} className="hover:text-cyan-400 transition-colors">Store</a>
          <a href="#chronos-page" onClick={(e) => handleLinkClick(e, 'chronos-page')} className="text-cyan-500 hover:text-cyan-300 transition-colors">Chronos AI</a>
          <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-cyan-400 transition-colors">Community</a>
          <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')} className="hover:text-cyan-400 transition-colors">Logs</a>
          <a href="https://discord.gg/vPq93wguyf" target="_blank" rel="noreferrer" className="text-indigo-400">Discord</a>
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