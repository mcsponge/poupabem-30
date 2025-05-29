
import React from 'react';
import { Card } from '@/components/ui/card';
import { ExpenseSummary } from '@/types';
import { formatCurrency, generateCategoryPercentage } from '@/utils/expenseUtils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface ExpenseChartProps {
  summary: ExpenseSummary;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/90 backdrop-blur-sm p-3 border border-white/20 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{data.category}</p>
        <p className="text-sm text-gray-700">{formatCurrency(data.amount)}</p>
        <p className="text-xs text-gray-500">{data.percentage.toFixed(1)}%</p>
      </div>
    );
  }

  return null;
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ summary }) => {
  const data = generateCategoryPercentage(summary.byCategory, summary.total);
  
  if (data.length === 0) {
    return (
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-white h-[400px] flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="h-12 w-12 text-white/50 mx-auto mb-4" />
          <p className="text-white/70">Sem dados para exibir</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-blue-500/20">
          <TrendingUp className="h-6 w-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold">Gastos por Categoria</h3>
      </div>
      
      <div className="h-[280px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              innerRadius={60}
              paddingAngle={2}
              dataKey="amount"
              animationDuration={1000}
              animationBegin={200}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-3">
        {data.slice(0, 4).map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg backdrop-blur-sm"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full shadow-lg"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium">{item.category}</span>
            </div>
            <div className="text-right">
              <div className="font-semibold">{formatCurrency(item.amount)}</div>
              <div className="text-sm text-white/70">{item.percentage.toFixed(1)}%</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExpenseChart;
