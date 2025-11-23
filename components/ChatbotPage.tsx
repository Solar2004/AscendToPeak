/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, GraphNode, GraphLink } from '../types';
import { sendMessageToOpenRouter } from '../services/openRouterService';
import { KnowledgeChunk } from '../knowledge';
import ChatHeader from './chat/ChatHeader';
import ChatSidebar from './chat/ChatSidebar';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';

interface ChatbotPageProps {
    onBack: () => void;
}

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
    const scrollRef = useRef<HTMLDivElement>(null);

    // Graph State
    const [graphNodes, setGraphNodes] = useState<GraphNode[]>([]);
    const [graphLinks, setGraphLinks] = useState<GraphLink[]>([]);

    // Scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    // Graph Simulation Effect
    useEffect(() => {
        if (graphNodes.length === 0) return;

        const interval = setInterval(() => {
            setGraphNodes(nodes => nodes.map(node => ({
                ...node,
                x: node.x + (Math.random() - 0.5) * 0.5,
                y: node.y + (Math.random() - 0.5) * 0.5
            })));
        }, 50);

        return () => clearInterval(interval);
    }, [graphNodes]);

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

                // Update Graph Visualization
                const newNodes: GraphNode[] = response.contextUsed.map((ctx, i) => ({
                    id: ctx.id,
                    label: ctx.title,
                    x: 150 + (Math.random() - 0.5) * 100,
                    y: 150 + (Math.random() - 0.5) * 100,
                    category: 'concept'
                }));

                // Add links based on relatedIds
                const newLinks: GraphLink[] = [];
                response.contextUsed.forEach((ctx, i) => {
                    if (ctx.relatedIds) {
                        ctx.relatedIds.forEach(relatedId => {
                            const target = newNodes.find(n => n.id === relatedId);
                            if (target) {
                                newLinks.push({
                                    source: newNodes[i],
                                    target: target
                                });
                            }
                        });
                    }
                    // Link to center/previous if no explicit relations
                    if (i > 0) {
                        newLinks.push({
                            source: newNodes[i],
                            target: newNodes[i - 1]
                        });
                    }
                });

                setGraphNodes(newNodes);
                setGraphLinks(newLinks);
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

    return (
        <div className="h-screen bg-[#09090b] flex flex-col font-sans overflow-hidden">
            <ChatHeader onBack={onBack} isThinking={isThinking} />

            <div className="flex-1 flex overflow-hidden max-w-[1800px] mx-auto w-full">
                <ChatSidebar
                    activeContext={activeContext}
                    graphNodes={graphNodes}
                    graphLinks={graphLinks}
                />

                <div className="flex-1 flex flex-col bg-black relative min-w-0">
                    <MessageList
                        messages={messages}
                        isThinking={isThinking}
                        investigationStatus={investigationStatus}
                        scrollRef={scrollRef}
                    />

                    <ChatInput
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleSend={handleSend}
                        isThinking={isThinking}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;