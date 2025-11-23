import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage } from '../../types';
import { parseMessageContent } from '../../utils/messageParser';
import MermaidDiagram from '../visualization/MermaidDiagram';
import DataChart from '../visualization/DataChart';
import ImageGallery from '../visualization/ImageGallery';
import FlowDiagram from '../visualization/FlowDiagram';

interface MessageListProps {
    messages: ChatMessage[];
    isThinking: boolean;
    investigationStatus: string;
    scrollRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isThinking, investigationStatus, scrollRef }) => {
    return (
        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8" ref={scrollRef}>
            {messages.map((msg, idx) => {
                const content = msg.role === 'model' ? parseMessageContent(msg.text) : { cleanText: msg.text, images: [], charts: [], diagrams: [], flowDiagrams: [] };

                return (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                                {msg.role === 'user' ? 'OPERATOR' : 'CHRONOS_AI'}
                            </span>

                            <div className={`p-6 border text-sm md:text-base leading-relaxed ${msg.role === 'user'
                                ? 'bg-zinc-900 border-zinc-700 text-zinc-200 whitespace-pre-wrap font-mono'
                                : 'bg-[#050505] border-cyan-900/40 text-cyan-100 shadow-[0_0_20px_rgba(6,182,212,0.05)] prose prose-invert prose-sm max-w-none'
                                }`}>
                                {msg.role === 'user' ? (
                                    content.cleanText
                                ) : (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {content.cleanText}
                                    </ReactMarkdown>
                                )}

                                {/* Render Diagrams (Mermaid) */}
                                {content.diagrams.map((code, i) => (
                                    <MermaidDiagram
                                        key={i}
                                        code={code}
                                    />
                                ))}

                                {/* Render Flow Diagrams (JSON) */}
                                {content.flowDiagrams && content.flowDiagrams.map((flow, i) => (
                                    <FlowDiagram
                                        key={i}
                                        data={flow}
                                    />
                                ))}

                                {/* Render Charts (Chart.js) */}
                                {content.charts.map((chart, i) => (
                                    <DataChart
                                        key={i}
                                        chart={chart}
                                    />
                                ))}

                                {/* Render Images */}
                                <ImageGallery images={content.images} />
                            </div>

                            {msg.reasoning_details && (
                                <div className="flex items-center gap-1 mt-1 opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-cyan-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    <span className="text-[9px] text-cyan-500 font-mono tracking-wide">VERIFIED REASONING CHAIN</span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}

            {isThinking && (
                <div className="flex justify-start">
                    <div className="flex flex-col gap-2 p-4 border border-cyan-900/20 bg-cyan-950/5 animate-pulse">
                        <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping"></span>
                            <span className="text-xs text-cyan-500 font-mono uppercase tracking-widest">{investigationStatus || 'Processing...'}</span>
                        </div>
                        <div className="w-48 h-1 bg-zinc-900 rounded overflow-hidden">
                            <div className="h-full bg-cyan-500 w-1/2 animate-[slide-right_1s_infinite]"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageList;
