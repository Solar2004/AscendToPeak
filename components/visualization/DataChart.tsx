import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartOptions,
    ChartData
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ParsedChart } from '../../utils/messageParser';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// Helper to detect data keys dynamically if standard 'name'/'value' are missing
const getDataKeys = (data: any[]) => {
    if (!data || data.length === 0) return { labelKey: 'name', valueKey: 'value' };
    const firstItem = data[0];
    const keys = Object.keys(firstItem);

    // Prefer 'name' or 'label' or 'date' for X-axis
    const labelKey = keys.find(k => ['name', 'label', 'date', 'month', 'year', 'day'].includes(k.toLowerCase()))
        || keys.find(k => typeof firstItem[k] === 'string')
        || keys[0];

    // Prefer 'value' or 'count' or 'amount' for Y-axis
    const valueKey = keys.find(k => ['value', 'count', 'amount', 'total', 'score'].includes(k.toLowerCase()))
        || keys.find(k => typeof firstItem[k] === 'number')
        || keys[1]
        || keys[0];

    return { labelKey, valueKey };
};

const DataChart: React.FC<{ chart: ParsedChart }> = ({ chart }) => {
    const { data, type, title, xAxisLabel, yAxisLabel } = chart;

    const chartData = useMemo<ChartData<'line' | 'bar'>>(() => {
        if (!data || data.length === 0) return { labels: [], datasets: [] };

        const { labelKey, valueKey } = getDataKeys(data);
        const labels = data.map(item => item[labelKey]);
        const values = data.map(item => item[valueKey]);

        return {
            labels,
            datasets: [
                {
                    label: title || 'Data',
                    data: values,
                    borderColor: '#06b6d4', // cyan-500
                    backgroundColor: type === 'area' ? 'rgba(6, 182, 212, 0.2)' : '#06b6d4',
                    borderWidth: 2,
                    pointBackgroundColor: '#06b6d4',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#06b6d4',
                    fill: type === 'area',
                    tension: 0.3, // Smooth curves for lines
                },
            ],
        };
    }, [data, type, title]);

    const options: ChartOptions<'line' | 'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Hide legend for single dataset usually
                labels: {
                    color: '#9ca3af', // gray-400
                },
            },
            title: {
                display: false,
                text: title,
                color: '#e5e7eb', // gray-200
            },
            tooltip: {
                backgroundColor: '#18181b', // zinc-900
                titleColor: '#f3f4f6', // gray-100
                bodyColor: '#d1d5db', // gray-300
                borderColor: '#334155', // slate-700
                borderWidth: 1,
                padding: 10,
                displayColors: false,
            },
        },
        scales: {
            x: {
                grid: {
                    color: '#333',
                    display: false,
                },
                ticks: {
                    color: '#9ca3af', // gray-400
                    font: {
                        size: 10,
                    }
                },
                title: {
                    display: !!xAxisLabel,
                    text: xAxisLabel,
                    color: '#6b7280', // gray-500
                    font: {
                        size: 10,
                        weight: 'bold'
                    }
                }
            },
            y: {
                grid: {
                    color: '#333', // Dark grid lines
                    // borderDash: [5, 5],
                },
                ticks: {
                    color: '#9ca3af', // gray-400
                    font: {
                        size: 10,
                    }
                },
                title: {
                    display: !!yAxisLabel,
                    text: yAxisLabel,
                    color: '#6b7280', // gray-500
                    font: {
                        size: 10,
                        weight: 'bold'
                    }
                }
            },
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
    };

    if (!data || data.length === 0) {
        return (
            <div className="my-6 p-4 bg-[#0c0c0e] border border-red-900/30 rounded text-red-500 text-xs font-mono">
                ⚠️ Chart Data Error: No data available to display.
            </div>
        );
    }

    return (
        <div className="my-6 p-4 bg-[#0c0c0e] border border-cyan-900/30 rounded shadow-lg shadow-cyan-900/10">
            {title && (
                <h4 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4 text-center">
                    {title}
                </h4>
            )}
            <div className="h-64 w-full relative">
                <Chart
                    type={type === 'bar' ? 'bar' : 'line'}
                    data={chartData}
                    options={options}
                />
            </div>
            {(xAxisLabel || yAxisLabel) && (
                <div className="flex justify-between text-[10px] text-zinc-600 mt-2 font-mono uppercase px-2">
                    <span>{xAxisLabel}</span>
                    <span>{yAxisLabel}</span>
                </div>
            )}
        </div>
    );
};

export default DataChart;
