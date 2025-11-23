/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-[#0c0c0e] border-t border-white/5">
      
      {/* Mission */}
      <div className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-32">
        <div className="md:w-1/3 sticky top-24">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Biology is <br/> <span className="text-cyan-500">programmable.</span>
          </h2>
        </div>
        <div className="md:w-2/3 max-w-2xl">
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8">
            Ascend to Peak is not a lifestyle brand. It is a research collective. We operate on the bleeding edge of looksmaxxing, endocrinology, and peptide therapy. 
          </p>
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8">
            From peptides to surgical consultation, we provide the tools and the data. We sell coaching with professional doctors to manage cycles safely, and we offer state-of-the-art bone and face analysis software to quantify your potential.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-12">
             <div className="p-6 bg-zinc-900/50 border border-zinc-800">
                <h4 className="text-white font-mono text-sm uppercase mb-2">Hardmaxx</h4>
                <p className="text-zinc-500 text-sm">Surgical and hormonal intervention strategies.</p>
             </div>
             <div className="p-6 bg-zinc-900/50 border border-zinc-800">
                <h4 className="text-white font-mono text-sm uppercase mb-2">Softmaxx</h4>
                <p className="text-zinc-500 text-sm">Dermal, nutritional, and grooming optimization.</p>
             </div>
          </div>

          <div className="mt-12 flex items-center gap-4 p-4 border border-yellow-900/30 bg-yellow-900/10 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-600 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-xs text-yellow-600 font-mono uppercase">
              Disclaimer: All compounds are sold strictly for laboratory research purposes. Not for human consumption.
            </p>
          </div>
        </div>
      </div>

      {/* Features / App Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] border-t border-white/5">
        <div className="order-2 lg:order-1 relative h-[500px] lg:h-auto overflow-hidden group">
           <img 
             src="https://images.unsplash.com/photo-1576091160550-2187d80a16f7?auto=format&fit=crop&q=80&w=1200" 
             alt="Lab Research" 
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 grayscale contrast-125 opacity-60"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center p-12 lg:p-24 bg-[#09090b]">
           <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-6 font-mono">The App</span>
           <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
             Data. Analysis. <br/> Supervision.
           </h3>
           <p className="text-lg text-zinc-400 font-light leading-relaxed mb-12 max-w-md">
             Our exclusive app connects you with our medical team. Upload bloodwork, track cycle logs with graphical interfaces, and get real-time feedback on your protocol.
           </p>
           <ul className="space-y-4">
              <li className="flex items-center gap-3 text-zinc-300">
                 <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                 Encrypted Doctor Chat
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                 <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                 Protocol Visualization
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                 <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                 Cycle History Logging
              </li>
           </ul>
        </div>
      </div>
    </section>
  );
};

export default About;