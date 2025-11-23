import React from 'react';
import { KnowledgeChunk } from '../../knowledge';
import { GraphNode, GraphLink } from '../../types';

interface ChatSidebarProps {
    activeContext: KnowledgeChunk[];
    graphNodes: GraphNode[];
    graphLinks: GraphLink[];
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ activeContext, graphNodes, graphLinks }) => {
    return (
        <div className="w-full md:w-[400px] flex-shrink-0 border-r border-zinc-800/50 bg-[#0c0c0e] hidden md:flex flex-col">
            <div className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 flex justify-between flex-shrink-0">
                    <span>Neural Knowledge Graph</span>
                    {activeContext.length > 0 && <span className="text-cyan-500 animate-pulse">LIVE</span>}
                </h3>

                {/* Visualizer Container */}
                <div className="flex-shrink-0 h-[300px] bg-black/50 border border-zinc-800 rounded-lg relative overflow-hidden flex items-center justify-center mb-4">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    {graphNodes.length > 0 ? (
                        <svg width="300" height="300" className="z-10 animate-fade-in-up">
                            <defs>
                                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                                    <path d="M0,0 L0,6 L9,3 z" fill="#06b6d4" />
                                </marker>
                            </defs>
                            {/* Lines */}
                            {graphLinks.map((link, i) => (
                                <line
                                    key={i}
                                    x1={link.source.x}
                                    y1={link.source.y}
                                    x2={link.target.x}
                                    y2={link.target.y}
                                    stroke="#0e7490"
                                    strokeWidth="1"
                                    opacity="0.5"
                                />
                            ))}
                            {/* Nodes */}
                            {graphNodes.map((node, i) => (
                                <g key={node.id}>
                                    <circle
                                        cx={node.x}
                                        cy={node.y}
                                        r={i === 0 ? 6 : 4}
                                        fill={i === 0 ? '#06b6d4' : '#1e293b'}
                                        stroke="#06b6d4"
                                        strokeWidth="2"
                                        className="animate-pulse-glow"
                                    />
                                    <text
                                        x={node.x}
                                        y={node.y - 10}
                                        textAnchor="middle"
                                        fill="#94a3b8"
                                        fontSize="8"
                                        fontFamily="monospace"
                                        className="uppercase tracking-wide"
                                    >
                                        {node.label.substring(0, 15)}{node.label.length > 15 ? '...' : ''}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    ) : (
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-zinc-800 mx-auto mb-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                            </svg>
                            <span className="text-xs text-zinc-600 font-mono">Awaiting Data Stream</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-2 no-scrollbar min-h-0">
                    {activeContext.map(ctx => (
                        <div key={ctx.id} className="text-[10px] p-2 border-l-2 border-cyan-800 bg-zinc-900/50">
                            <span className="text-cyan-500 font-bold block mb-1">{ctx.title}</span>
                            <span className="text-zinc-500 font-mono">ID: {ctx.id} // RELATIONS: {ctx.relatedIds?.length || 0}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatSidebar;
