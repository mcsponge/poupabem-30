
import React from 'react';
import { Card } from '@/components/ui/card';
import { ExpenseSummary } from '@/types';
import { formatCurrency } from '@/utils/expenseUtils';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar } from 'lucide-react';

interface MonthlyExpenseChartProps {
  summary: ExpenseSummary;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        <p className="text-sm text-blue-600 dark:text-blue-400">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

const MonthlyExpenseChart: React.FC<MonthlyExpenseChartProps> = ({ summary }) => {
  const data = Object.entries(summary.byMonth).map(([month, amount]) => ({
    month,
    amount,
  })).sort((a, b) => {
    const [monthA, yearA] = a.month.split('/');
    const [monthB, yearB] = b.month.split('/');
    const dateA = new Date(parseInt(yearA), parseInt(monthA) - 1);
    const dateB = new Date(parseInt(yearB), parseInt(monthB) - 1);
    return dateA.getTime() - dateB.getTime();
  });

  if (data.length === 0) {
    return (
      <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Sem dados mensais para exibir</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
          <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Gastos por Mês</h3>
      </div>
      
      <div className="h-[280px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'currentColor', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'currentColor', fontSize: 12 }}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="amount" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-3">
        {data.slice(-3).map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <span className="font-medium text-gray-900 dark:text-white">{item.month}</span>
            <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(item.amount)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MonthlyExpenseChart;
