import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressChartProps {
  data: Array<{
    date: string;
    correct: number;
    total: number;
  }>;
}

export default function ProgressChart({ data }: ProgressChartProps) {
  const chartData = data.map(item => ({
    ...item,
    percentage: Math.round((item.correct / item.total) * 100)
  }));

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            stroke="#9CA3AF"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#9CA3AF"
            domain={[0, 100]}
          />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="percentage" 
            stroke="#4F46E5" 
            strokeWidth={2}
            dot={{ fill: '#4F46E5', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}