/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { KNOWLEDGE_BASE, KnowledgeChunk } from '../knowledge';
import { ChatMessage } from '../types';

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL_ID = "x-ai/grok-4.1-fast";

/**
 * SIMULATED VECTOR SEARCH SYSTEM
 * ------------------------------
 * Since we don't have a real vector DB in the browser, we simulate embedding similarity
 * by tokenizing the query and comparing it against the 'vector_sim' keywords + content
 * of the knowledge chunks.
 */

// 1. Simple Tokenizer
const tokenize = (text: string): string[] => {
    return text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 2); // Filter out tiny words
};

// 2. Cosine Similarity Simulation
// Calculates how "close" the query vector is to the document vector
const calculateRelevanceScore = (queryTokens: string[], chunk: KnowledgeChunk): number => {
    let score = 0;

    // Check Keyword Vectors (High Weight)
    // These act as the "Semantic Embedding"
    chunk.vector_sim.forEach(keyword => {
        if (queryTokens.includes(keyword.toLowerCase())) {
            score += 20; // High relevance hit
        }
        // Partial match support
        queryTokens.forEach(qt => {
            if (keyword.includes(qt) || qt.includes(keyword)) {
                score += 8;
            }
        });
    });

    // Check Title (Medium Weight)
    const titleTokens = tokenize(chunk.title);
    titleTokens.forEach(tt => {
        if (queryTokens.includes(tt)) score += 12;
    });

    // Check Content (Low Weight but high volume)
    const contentTokens = tokenize(chunk.content);
    let contentMatches = 0;
    contentTokens.forEach(ct => {
        if (queryTokens.includes(ct)) contentMatches++;
    });
    // Logarithmic scaling for content to prevent long articles from dominating purely by length
    score += Math.log(contentMatches + 1) * 3;

    return score;
};

// 3. Graph Traversal & Activation Spreading
// If Node A is relevant, Node B (linked to A) gets "activated" even if the query didn't strictly mention it.
const performNeuralSearch = (query: string): KnowledgeChunk[] => {
    const queryTokens = tokenize(query);
    const activationMap = new Map<string, number>();

    // Step A: Direct Hit Scoring
    KNOWLEDGE_BASE.forEach(chunk => {
        const score = calculateRelevanceScore(queryTokens, chunk);
        if (score > 0) {
            activationMap.set(chunk.id, score);
        }
    });

    // Step B: Spread Activation (The "Connections" Logic)
    // If a node is highly active, it excites its neighbors
    const SPREAD_FACTOR = 0.5; // Neighbors get 50% of the parent's heat

    // Create a snapshot of keys to iterate to avoid infinite loops during updates
    const initialKeys = Array.from(activationMap.keys());

    initialKeys.forEach(sourceId => {
        const sourceScore = activationMap.get(sourceId) || 0;
        const sourceNode = KNOWLEDGE_BASE.find(k => k.id === sourceId);

        if (sourceNode && sourceNode.relatedIds) {
            sourceNode.relatedIds.forEach(targetId => {
                const currentScore = activationMap.get(targetId) || 0;
                // Add excitation
                const excitation = sourceScore * SPREAD_FACTOR;
                activationMap.set(targetId, currentScore + excitation);
            });
        }
    });

    // Step C: Sort & Filter
    const sortedResults = Array.from(activationMap.entries())
        .sort((a, b) => b[1] - a[1]) // Sort by score descending
        .filter(entry => entry[1] > 0.5); // Very low threshold to ensure data flow

    // Return top chunks (Expanded window)
    return sortedResults.slice(0, 10).map(entry => {
        return KNOWLEDGE_BASE.find(k => k.id === entry[0])!;
    });
};

export const sendMessageToOpenRouter = async (
    history: ChatMessage[],
    newMessage: string
): Promise<{ text: string, reasoning_details?: any, contextUsed?: KnowledgeChunk[] }> => {

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey) {
        throw new Error("API_KEY_MISSING");
    }

    // --- NEURAL SEARCH EXECUTION ---
    const relevantContext = performNeuralSearch(newMessage);

    // Format context with explicit "Neural Path" info for the AI
    const contextString = relevantContext.map(k => {
        const relations = k.relatedIds
            ? k.relatedIds.map(rid => KNOWLEDGE_BASE.find(kb => kb.id === rid)?.title).filter(Boolean).join(' -> ')
            : 'End Node';

        return `[NEURAL_NODE_ID: ${k.id}]
TYPE: ${k.category}
TITLE: ${k.title}
DATA: ${k.content}
CONNECTED_CONCEPTS: ${relations}
------------------------------------------------`;
    }).join('\n\n');

    const systemPrompt = `You are Chronos, the central intelligence for "Ascend to Peak".
    
    ACCESSING NEURAL ARCHIVE...
    ${relevantContext.length} DATA NODES FOUND.
    
    CONTEXTUAL DATA STREAM:
    ${contextString || "NO ARCHIVE MATCHES. RELY ON GENERAL TRAINING."}
    
    DIRECTIVES:
    1.  **Use the Neural Data**: You MUST reference the provided [NEURAL_NODE_ID] data in your answer. The user expects you to use this specific knowledge base.
    2.  **Synthesize**: Do not just repeat the data. Look at the [CONNECTED_CONCEPTS] and explain *how* Node A relates to Node B if relevant.
    3.  **Investigate**: If the data shows a chain (e.g. MK-677 -> GH -> Sleep), walk the user through that biological pathway.
    4.  **Safety**: If discussing 'Compounds' or 'Peptides', YOU MUST APPEND: "Disclaimer: For laboratory research purposes only. Not for human consumption."
    5.  **Tone**: Clinical, High-Tech, "Cyber-Medical".
    6.  **Markdown**: Use proper markdown formatting for your text responses (headings, lists, bold, italic, etc.)
    
    --- VISUALIZATION PROTOCOLS ---
    You can generate Rich Media responses. Use these specific formats when helpful:

    [GRAPHS - CRITICAL: VALID JSON ONLY]
    To display a chart, output STRICTLY VALID JSON inside a \`\`\`json\`\`\` code block.
    DO NOT include any text before or after the JSON block.
    DO NOT use trailing commas.
    
    Example BAR CHART:
    \`\`\`json
    {
      "type": "bar",
      "title": "Growth Hormone Levels by Compound",
      "xAxisLabel": "Compound",
      "yAxisLabel": "GH Increase (%)",
      "data": [
        { "name": "Baseline", "value": 100 },
        { "name": "MK-677", "value": 250 },
        { "name": "CJC-1295", "value": 180 },
        { "name": "Ipamorelin", "value": 150 }
      ]
    }
    \`\`\`
    
    Example LINE CHART:
    \`\`\`json
    {
      "type": "line",
      "title": "GH Pulse Over 24 Hours",
      "xAxisLabel": "Time (hours)",
      "yAxisLabel": "GH Level (ng/mL)",
      "data": [
        { "name": "0h", "value": 0.5 },
        { "name": "2h", "value": 2.1 },
        { "name": "4h", "value": 8.4 },
        { "name": "6h", "value": 12.1 },
        { "name": "8h", "value": 6.2 },
        { "name": "12h", "value": 3.1 },
        { "name": "24h", "value": 1.2 }
      ]
    }
    \`\`\`
    
    Example AREA CHART:
    \`\`\`json
    {
      "type": "area",
      "title": "IGF-1 Levels During Treatment",
      "xAxisLabel": "Week",
      "yAxisLabel": "IGF-1 (ng/mL)",
      "data": [
        { "name": "Week 0", "value": 150 },
        { "name": "Week 2", "value": 180 },
        { "name": "Week 4", "value": 220 },
        { "name": "Week 8", "value": 280 }
      ]
    }
    \`\`\`

    [DIAGRAMS - FLOW/SEQUENCE]
    To display a flow diagram, output STRICTLY VALID JSON inside a \`\`\`json\`\`\` code block.
    The JSON must have 'nodes' and 'edges' arrays.
    
    Example FLOW DIAGRAM:
    \`\`\`json
    {
      "nodes": [
        { "id": "1", "label": "MK-677 Ingestion" },
        { "id": "2", "label": "Ghrelin Receptor Activation" },
        { "id": "3", "label": "Pituitary Stimulation" },
        { "id": "4", "label": "GH Release" }
      ],
      "edges": [
        { "source": "1", "target": "2", "label": "Ingest" },
        { "source": "2", "target": "3", "label": "Activate" },
        { "source": "3", "target": "4", "label": "Stimulate" }
      ],
      "direction": "TB"
    }
    \`\`\`
    
    DO NOT use Mermaid syntax. Use only this JSON format for diagrams.

    [IMAGES]
    To show an image, use Markdown image syntax: ![Alt Text](URL)
    Only use valid external image URLs ending in .jpg, .png, .gif, .webp
    
    IMPORTANT: Your response will be parsed to extract charts, diagrams, and images. These will be rendered separately.
    Write your text explanation in markdown, and the visualizations will appear inline automatically.`;

    const messages = [
        { role: 'system', content: systemPrompt },
        ...history.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : msg.role,
            content: msg.text,
            ...(msg.reasoning_details ? { reasoning_details: msg.reasoning_details } : {})
        })),
        { role: 'user', content: newMessage }
    ];

    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL_ID,
                messages: messages,
                reasoning: { enabled: true }
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API Error: ${response.status}`);
        }

        const data = await response.json();
        const choice = data.choices[0];

        return {
            text: choice.message.content,
            reasoning_details: choice.message.reasoning_details,
            contextUsed: relevantContext
        };

    } catch (error) {
        console.error("Service Error:", error);
        return {
            text: "CONNECTION_FAILURE: Neural link severed. Unable to reach reasoning core.",
            contextUsed: []
        };
    }
};