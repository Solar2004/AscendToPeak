
export interface ParsedChart {
    type: 'line' | 'bar' | 'area';
    title: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    data: any[];
}

export interface ParsedFlow {
    nodes: Array<{ id: string; label: string; type?: string }>;
    edges: Array<{ source: string; target: string; label?: string }>;
    direction?: 'TB' | 'LR';
}

export interface ExtractedContent {
    cleanText: string;
    images: string[];
    charts: ParsedChart[];
    diagrams: string[]; // Mermaid syntax strings
    flowDiagrams: ParsedFlow[]; // JSON Flow diagrams
}

export const parseMessageContent = (text: string): ExtractedContent => {
    let cleanText = text;
    const images: string[] = [];
    const charts: ParsedChart[] = [];
    const diagrams: string[] = [];
    const flowDiagrams: ParsedFlow[] = [];

    // 1. Extract JSON Charts & Flows
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

            // Check if it's a Chart
            if (parsed.type && ['line', 'bar', 'area'].includes(parsed.type) && parsed.data && Array.isArray(parsed.data)) {
                charts.push(parsed);
                cleanText = cleanText.replace(match[0], '');
            }
            // Check if it's a Flow Diagram
            else if (parsed.nodes && Array.isArray(parsed.nodes) && parsed.edges && Array.isArray(parsed.edges)) {
                flowDiagrams.push(parsed);
                cleanText = cleanText.replace(match[0], '');
            }
        } catch (e) {
            console.error("Failed to parse JSON content:", e);
            // If parse fails, we leave it in the text or handle error
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

    // 4. Extract Raw URLs
    // Sometimes models output raw URLs for images
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

    return { cleanText, images, charts, diagrams, flowDiagrams };
};
