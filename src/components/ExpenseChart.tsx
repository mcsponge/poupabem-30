
import React from 'react';
import { Card } from '@/components/ui/card';
import { ExpenseSummary } from '@/types';
import { formatCurrency, generateCategoryPercentage } from '@/utils/expenseUtils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ExpenseChartProps {
  summary: ExpenseSummary;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass p-3 border border-border/50 rounded-md animate-fade-in">
        <p className="font-medium">{data.category}</p>
        <p className="text-sm">{formatCurrency(data.amount)}</p>
        <p className="text-xs text-muted-foreground">{data.percentage.toFixed(1)}%</p>
      </div>
    );
  }

  return null;
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ summary }) => {
  const data = generateCategoryPercentage(summary.byCategory, summary.total);
  
  if (data.length === 0) {
    return (
      <Card className="p-6 glass border-border/50 h-[320px] flex items-center justify-center animate-fade-in">
        <p className="text-muted-foreground">Sem dados para exibir</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 glass border-border/50 animate-fade-in">
      <h3 className="font-medium mb-4">Gastos por Categoria</h3>
      
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={50}
              paddingAngle={2}
              dataKey="amount"
              animationDuration={800}
              animationBegin={100}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 text-sm"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="truncate">{item.category}</span>
            <span className="text-muted-foreground ml-auto">
              {item.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExpenseChart;
