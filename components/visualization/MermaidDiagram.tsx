import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram: React.FC<{ code: string }> = ({ code }) => {
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
        }).catch((error) => {
            console.error("Mermaid Render Error", error);
            setHasError(true);
            const errorMsg = error instanceof Error ? error.message : String(error);
            setSvg(`<div class="text-red-500 text-xs p-2 border border-red-900">⚠️ Diagram Syntax Error: ${errorMsg}</div>`);
        });
    }, [code, id]);

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

export default MermaidDiagram;
