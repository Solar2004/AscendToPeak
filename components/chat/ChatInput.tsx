import React from 'react';

interface ChatInputProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    handleSend: () => void;
    isThinking: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ inputValue, setInputValue, handleSend, isThinking }) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex-shrink-0 p-6 md:p-8 border-t border-zinc-800 bg-[#0c0c0e] z-10">
            <div className="relative max-w-4xl mx-auto">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter research parameters (e.g., 'Visualize GH pulse with MK-677')"
                    autoFocus
                    className="w-full bg-black border border-zinc-700 py-4 pl-6 pr-24 text-white outline-none focus:border-cyan-500 transition-colors font-mono placeholder-zinc-700 shadow-inner"
                />
                <div className="absolute right-2 top-2 bottom-2">
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isThinking}
                        className="h-full px-6 bg-cyan-900/30 text-cyan-400 hover:bg-cyan-500 hover:text-white border border-cyan-900/50 hover:border-cyan-500 transition-all font-mono text-xs font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        Execute
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-3 flex justify-between items-center text-[10px] text-zinc-600 uppercase font-mono tracking-widest">
                <span>Secure Encrypted Channel</span>
                <span>Knowledge Base: v3.2 (Graph Enabled)</span>
            </div>
        </div>
    );
};

export default ChatInput;
