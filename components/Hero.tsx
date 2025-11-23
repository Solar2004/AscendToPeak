/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';

interface HeroProps {
  onChronosClick?: () => void;
  onStoreClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onChronosClick, onStoreClick }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (onStoreClick) {
        onStoreClick();
        return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore
      }
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-black">
      
      {/* Background Image - High Tech / Gym / Lab */}
      <div className="absolute inset-0 w-full h-full">
        <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000" 
            alt="Dark silhouette in training environment" 
            className="w-full h-full object-cover grayscale contrast-[1.2] brightness-[0.4]"
        />
        {/* Digital Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/50"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start text-left px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="animate-fade-in-up w-full max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            <span className="text-xs md:text-sm font-mono font-medium uppercase tracking-[0.2em] text-cyan-400">
              Research Phase 4.0
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
            ASCEND TO <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">PEAK.</span>
          </h1>
          
          <p className="max-w-xl text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-12 border-l-2 border-zinc-800 pl-6">
            A community dedicated to research and biological optimization.
            Access peptides, professional cycle coaching, and advanced facial analysis software.
            <br/><span className="text-xs mt-2 block opacity-50 uppercase tracking-widest">For research purposes only.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <a 
              href="#store-page" 
              onClick={(e) => handleNavClick(e, 'products')}
              className="px-10 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Access Research
            </a>
            {onChronosClick && (
                <button 
                  onClick={onChronosClick}
                  className="px-10 py-4 border border-cyan-700 bg-cyan-950/30 text-cyan-400 text-sm font-bold uppercase tracking-widest hover:bg-cyan-900/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    Launch Chronos AI
                </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats / Tech Specs */}
      <div className="absolute bottom-12 right-12 hidden md:flex gap-12 text-right text-xs font-mono text-zinc-500">
         <div>
            <span className="block text-white">CHRONOS AI</span>
            <span>ONLINE v2.4 (CLAUDE-SIM)</span>
         </div>
         <div>
            <span className="block text-white">JANOSHIK</span>
            <span>VERIFIED</span>
         </div>
         <div>
            <span className="block text-white">MEMBERS</span>
            <span>14,203</span>
         </div>
      </div>
    </section>
  );
};

export default Hero;