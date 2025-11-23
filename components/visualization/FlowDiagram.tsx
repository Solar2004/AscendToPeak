import React, { useMemo } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    Position,
    MarkerType,
    Node,
    Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';

interface FlowData {
    nodes: Array<{ id: string; label: string; type?: string }>;
    edges: Array<{ source: string; target: string; label?: string }>;
    direction?: 'TB' | 'LR';
}

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            targetPosition: direction === 'LR' ? Position.Left : Position.Top,
            sourcePosition: direction === 'LR' ? Position.Right : Position.Bottom,
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
};

const FlowDiagram: React.FC<{ data: FlowData }> = ({ data }) => {
    const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
        const flowNodes: Node[] = data.nodes.map((n) => ({
            id: n.id,
            data: { label: n.label },
            position: { x: 0, y: 0 }, // Calculated by dagre
            style: {
                background: '#18181b', // zinc-900
                color: '#fff',
                border: '1px solid #06b6d4', // cyan-500
                borderRadius: '4px',
                fontSize: '12px',
                padding: '10px',
                width: nodeWidth,
                textAlign: 'center',
            },
        }));

        const flowEdges: Edge[] = data.edges.map((e, i) => ({
            id: `e${i}`,
            source: e.source,
            target: e.target,
            label: e.label,
            animated: true,
            style: { stroke: '#06b6d4' },
            labelStyle: { fill: '#a1a1aa', fontSize: 10 }, // zinc-400
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#06b6d4',
            },
        }));

        return getLayoutedElements(flowNodes, flowEdges, data.direction || 'TB');
    }, [data]);

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div className="h-96 w-full border border-cyan-900/30 rounded bg-[#0c0c0e] my-4">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                attributionPosition="bottom-right"
            >
                <Background color="#333" gap={16} />
                <Controls className="bg-zinc-800 border-zinc-700 fill-zinc-200" />
            </ReactFlow>
        </div>
    );
};

export default FlowDiagram;
