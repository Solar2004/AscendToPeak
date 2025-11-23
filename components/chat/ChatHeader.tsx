import React from 'react';

interface ChatHeaderProps {
    onBack: () => void;
    isThinking: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onBack, isThinking }) => {
    return (
        <div className="flex-shrink-0 z-50 bg-[#09090b]/90 backdrop-blur-xl border-b border-zinc-800">
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
                        <h1 className="text-xl font-bold text-white tracking-widest uppercase">Chronos Terminal</h1>
                        <span className="text-[10px] text-cyan-500 font-mono">CONNECTION_SECURE // MODEL: GROK-BETA</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-600">
                    <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${isThinking ? 'bg-cyan-500 animate-pulse' : 'bg-green-500'}`}></span>
                        <span>STATUS: {isThinking ? 'COMPUTING' : 'IDLE'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
