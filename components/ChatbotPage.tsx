/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage } from '../types';
import { sendMessageToOpenRouter } from '../services/openRouterService';
import { KnowledgeChunk } from '../knowledge';
import {
    LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import mermaid from 'mermaid';

interface ChatbotPageProps {
    onBack: () => void;
}

// Simple internal type for graph nodes/links for visualization
interface GraphNode {
    id: string;
    label: string;
    x: number;
    y: number;
    category: string;
}

interface GraphLink {
    source: { x: number, y: number };
    target: { x: number, y: number };
}

// Types for Extracted Content
interface ParsedChart {
    type: 'line' | 'bar' | 'area';
    title: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    data: any[];
}

interface ExtractedContent {
    cleanText: string;
    images: string[];
    charts: ParsedChart[];
    diagrams: string[]; // Mermaid syntax strings
}

// --- HELPER COMPONENTS ---

// 1. Mermaid Renderer
const MermaidDiagram: React.FC<{ code: string; onError?: (error: string) => void }> = ({ code, onError }) => {
    const [svg, setSvg] = useState<string>('');
    const [hasError, setHasError] = useState(false);
    const id = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`).current;

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'monospace'
        });

        mermaid.render(id, code).then((result) => {
            setSvg(result.svg);
            setHasError(false);
        }).catch(err => {
            console.error("Mermaid Render Error", err);
            setHasError(true);
            const errorMsg = err?.message || 'Unknown diagram error';
            setSvg(`<div class="text-red-500 text-xs p-2 border border-red-900">⚠️ Diagram Syntax Error: ${errorMsg}</div>`);
            if (onError) onError(errorMsg);
        });
    }, [code, id, onError]);

    return (
        <div className="my-4 p-4 bg-[#0c0c0e] border border-cyan-900/30 rounded overflow-x-auto">
            <div dangerouslySetInnerHTML={{ __html: svg }} />
            {hasError && (
                <div className="mt-2 text-[10px] text-zinc-500 font-mono">
                    AI will attempt to regenerate this diagram...
                </div>
            )}
        </div>
    );
};

// 2. Chart Renderer (Recharts)
const DataChart: React.FC<{ chart: ParsedChart; onError?: (error: string) => void }> = ({ chart, onError }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // Validate chart data
        if (!chart.data || chart.data.length === 0) {
            setHasError(true);
            if (onError) onError('Chart has no data');
        } else {
            setHasError(false);
        }
    }, [chart, onError]);
    const renderChart = () => {
        switch (chart.type) {
            case 'bar':
                return (
                    <BarChart data={chart.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#666" fontSize={10} tick={{ fill: '#666' }} />
                        <YAxis stroke="#666" fontSize={10} tick={{ fill: '#666' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
                            itemStyle={{ color: '#06b6d4' }}
                        />
                        <Bar dataKey="value" fill="#06b6d4" />
                    </BarChart>
                );
            case 'area':
                return (
                    <AreaChart data={chart.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#666" fontSize={10} tick={{ fill: '#666' }} />
                        <YAxis stroke="#666" fontSize={10} tick={{ fill: '#666' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
                            itemStyle={{ color: '#06b6d4' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
                    </AreaChart>
                );
            case 'line':
            default:
                return (
                    <LineChart data={chart.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#666" fontSize={10} tick={{ fill: '#666' }} />
                        <YAxis stroke="#666" fontSize={10} tick={{ fill: '#666' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
                            itemStyle={{ color: '#06b6d4' }}
                        />
                        <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
                    </LineChart>
                );
        }
    };

    return (
        <div className="my-6 p-4 bg-[#0c0c0e] border border-cyan-900/30 rounded">
            <h4 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4 text-center">{chart.title}</h4>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            </div>
            {chart.xAxisLabel && <div className="text-center text-[10px] text-zinc-600 mt-2 font-mono uppercase">{chart.xAxisLabel}</div>}
        </div>
    );
};

// 3. Image Gallery
const ImageGallery: React.FC<{ images: string[] }> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (images.length === 0) return null;

    return (
        <>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="group relative aspect-video bg-zinc-900 border border-zinc-800 cursor-pointer overflow-hidden hover:border-cyan-500/50 transition-colors"
                        onClick={() => setSelectedImage(img)}
                    >
                        <img src={img} alt="reference" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-2 py-1 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[8px] font-mono text-zinc-300 uppercase">Source: Web</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-8 backdrop-blur-sm animate-fade-in-up">
                    <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col">
                        <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                            <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Image Analysis Viewer</span>
                            <div className="flex gap-4">
                                <button onClick={() => setSelectedImage(null)} className="text-zinc-500 hover:text-white text-xs uppercase font-bold">Minimize [-]</button>
                                <button onClick={() => setSelectedImage(null)} className="text-zinc-500 hover:text-red-500 text-xs uppercase font-bold">Close [x]</button>
                            </div>
                        </div>
                        <img src={selectedImage} alt="Full View" className="w-full h-auto max-h-[80vh] object-contain border border-zinc-800 bg-zinc-900" />
                    </div>
                </div>
            )}
        </>
    );
};


const ChatbotPage: React.FC<ChatbotPageProps> = ({ onBack }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'model',
            text: 'Chronos v3.1 Initialized. Neural Link Established.\n\nReady to access the Ascend knowledge base. Query protocol active.',
            timestamp: Date.now()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [investigationStatus, setInvestigationStatus] = useState<string>('');
    const [activeContext, setActiveContext] = useState<KnowledgeChunk[]>([]);
    const [visualizationErrors, setVisualizationErrors] = useState<{ messageIndex: number, type: 'chart' | 'diagram', error: string }[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Graph State
    const [graphNodes, setGraphNodes] = useState<GraphNode[]>([]);
    const [graphLinks, setGraphLinks] = useState<GraphLink[]>([]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking, investigationStatus]);

    // Generate visualization data from context
    useEffect(() => {
        if (activeContext.length === 0) {
            setGraphNodes([]);
            setGraphLinks([]);
            return;
        }

        // Simple radial layout
        const centerX = 150;
        const centerY = 150;
        const radius = 80;

        const newNodes: GraphNode[] = activeContext.map((chunk, index) => {
            // Place first item in center, others in circle
            if (index === 0) {
                return { id: chunk.id, label: chunk.title, x: centerX, y: centerY, category: chunk.category };
            }
            const angle = ((index - 1) / (activeContext.length - 1)) * 2 * Math.PI;
            return {
                id: chunk.id,
                label: chunk.title,
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
                category: chunk.category
            };
        });

        const newLinks: GraphLink[] = [];

        // Calculate links based on relations in the context
        activeContext.forEach(source => {
            if (!source.relatedIds) return;
            const sourceNode = newNodes.find(n => n.id === source.id);
            if (!sourceNode) return;

            source.relatedIds.forEach(targetId => {
                const targetNode = newNodes.find(n => n.id === targetId);
                if (targetNode) {
                    newLinks.push({
                        source: { x: sourceNode.x, y: sourceNode.y },
                        target: { x: targetNode.x, y: targetNode.y }
                    });
                }
            });

            if (source.id !== newNodes[0].id) {
                // Optional: Link everything to center visually
            }
        });

        setGraphNodes(newNodes);
        setGraphLinks(newLinks);

    }, [activeContext]);

    // --- CONTENT PARSER ---
    const parseMessageContent = (text: string): ExtractedContent => {
        let cleanText = text;
        const images: string[] = [];
        const charts: ParsedChart[] = [];
        const diagrams: string[] = [];

        // 1. Extract JSON Charts
        // Regex matches ```json { ... } ```
        const jsonRegex = /```json\s*([\s\S]*?)\s*```/g;
        let match;
        while ((match = jsonRegex.exec(text)) !== null) {
            try {
                // Clean the JSON: remove trailing commas before parsing
                let jsonContent = match[1]
                    .replace(/,\s*}/g, '}')  // Remove trailing commas before }
                    .replace(/,\s*]/g, ']')  // Remove trailing commas before ]
                    .trim();

                const parsed = JSON.parse(jsonContent);
                // Validate basic schema to ensure it's a chart
                if (parsed.type && parsed.data && Array.isArray(parsed.data)) {
                    charts.push(parsed);
                    // Remove the block from text
                    cleanText = cleanText.replace(match[0], '');
                }
            } catch (e) {
                console.error("Failed to parse chart JSON", e);
                // Don't remove the block if parsing failed - let it show as code
            }
        }

        // 2. Extract Mermaid Diagrams
        const mermaidRegex = /```mermaid\s*([\s\S]*?)\s*```/g;
        while ((match = mermaidRegex.exec(text)) !== null) {
            diagrams.push(match[1]);
            cleanText = cleanText.replace(match[0], '');
        }

        // 3. Extract Markdown Images
        // Regex for ![alt](url)
        const mdImageRegex = /!\[.*?\]\((.*?)\)/g;
        while ((match = mdImageRegex.exec(text)) !== null) {
            images.push(match[1]);
            cleanText = cleanText.replace(match[0], '');
        }

        // 4. Extract Raw URLs that look like images if not already caught
        const urlImageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|webp))/gi;
        // We only want to remove them if they are bare URLs, but regex is tricky to distinguish "bare" vs "in link".
        // For now, let's just find them and if they aren't in the images array yet, add them.
        while ((match = urlImageRegex.exec(cleanText)) !== null) {
            if (!images.includes(match[1])) {
                images.push(match[1]);
                // Optional: Remove bare URL from text to keep it clean
                cleanText = cleanText.replace(match[0], '');
            }
        }

        return { cleanText, images, charts, diagrams };
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsThinking(true);
        setInvestigationStatus('Initializing vector search...');

        setTimeout(() => setInvestigationStatus('Traversing knowledge graph...'), 800);

        try {
            const response = await sendMessageToOpenRouter(messages, userMsg.text);

            setInvestigationStatus('Synthesizing results...');

            if (response.contextUsed && response.contextUsed.length > 0) {
                setActiveContext(response.contextUsed);
            } else {
                setActiveContext([]);
            }

            await new Promise(resolve => setTimeout(resolve, 1200));

            const aiMsg: ChatMessage = {
                role: 'model',
                text: response.text,
                timestamp: Date.now(),
                reasoning_details: response.reasoning_details
            };

            setMessages(prev => [...prev, aiMsg]);
            setInvestigationStatus('');

        } catch (error) {
            const errorMsg: ChatMessage = { role: 'model', text: "SYSTEM ERROR: Neural link unstable. Retrying handshake...", timestamp: Date.now() };
            setMessages(prev => [...prev, errorMsg]);
            setInvestigationStatus('');
        } finally {
            setIsThinking(false);
        }
    };

    // Auto-retry visualization errors
    useEffect(() => {
        if (visualizationErrors.length > 0 && !isThinking) {
            const latestError = visualizationErrors[visualizationErrors.length - 1];
            const errorMessage = `The previous ${latestError.type} had a syntax error: "${latestError.error}". Please regenerate it with correct syntax.`;

            // Clear errors and auto-send fix request
            setVisualizationErrors([]);

            setTimeout(() => {
                const fixMsg: ChatMessage = { role: 'user', text: errorMessage, timestamp: Date.now() };
                setMessages(prev => [...prev, fixMsg]);
                setIsThinking(true);
                setInvestigationStatus('Fixing visualization syntax...');

                sendMessageToOpenRouter(messages, errorMessage).then(response => {
                    const aiMsg: ChatMessage = {
                        role: 'model',
                        text: response.text,
                        timestamp: Date.now(),
                        reasoning_details: response.reasoning_details
                    };
                    setMessages(prev => [...prev, aiMsg]);
                    setInvestigationStatus('');
                    setIsThinking(false);
                }).catch(() => {
                    setIsThinking(false);
                    setInvestigationStatus('');
                });
            }, 1500);
        }
    }, [visualizationErrors, isThinking, messages]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex flex-col font-sans">

            {/* Header */}
            <div className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-xl border-b border-zinc-800">
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

            <div className="flex-1 max-w-[1800px] mx-auto w-full flex flex-col md:flex-row overflow-hidden">

                {/* Sidebar - Knowledge Graph Visualizer */}
                <div className="w-full md:w-[400px] flex-shrink-0 p-6 md:p-8 border-r border-zinc-800/50 bg-[#0c0c0e] hidden md:flex flex-col gap-8">
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 flex justify-between">
                            <span>Neural Knowledge Graph</span>
                            {activeContext.length > 0 && <span className="text-cyan-500 animate-pulse">LIVE</span>}
                        </h3>

                        {/* Visualizer Container */}
                        <div className="flex-1 bg-black/50 border border-zinc-800 rounded-lg relative overflow-hidden flex items-center justify-center min-h-[300px]">
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

                        <div className="mt-4 max-h-[200px] overflow-y-auto pr-2 space-y-2 no-scrollbar">
                            {activeContext.map(ctx => (
                                <div key={ctx.id} className="text-[10px] p-2 border-l-2 border-cyan-800 bg-zinc-900/50">
                                    <span className="text-cyan-500 font-bold block mb-1">{ctx.title}</span>
                                    <span className="text-zinc-500 font-mono">ID: {ctx.id} // RELATIONS: {ctx.relatedIds?.length || 0}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-black relative">
                    <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8" ref={scrollRef}>
                        {messages.map((msg, idx) => {
                            const content = msg.role === 'model' ? parseMessageContent(msg.text) : { cleanText: msg.text, images: [], charts: [], diagrams: [] };

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
                                                    onError={(error) => {
                                                        setVisualizationErrors(prev => [...prev, {
                                                            messageIndex: idx,
                                                            type: 'diagram',
                                                            error
                                                        }]);
                                                    }}
                                                />
                                            ))}

                                            {/* Render Charts (Recharts) */}
                                            {content.charts.map((chart, i) => (
                                                <DataChart
                                                    key={i}
                                                    chart={chart}
                                                    onError={(error) => {
                                                        setVisualizationErrors(prev => [...prev, {
                                                            messageIndex: idx,
                                                            type: 'chart',
                                                            error
                                                        }]);
                                                    }}
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

                    {/* Input Area */}
                    <div className="p-6 md:p-8 border-t border-zinc-800 bg-[#0c0c0e]">
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
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;