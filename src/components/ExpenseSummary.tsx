
import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ExpenseSummary as ExpenseSummaryType } from '@/types';
import { formatCurrency } from '@/utils/expenseUtils';

interface ExpenseSummaryProps {
  summary: ExpenseSummaryType;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ summary }) => {
  // Get monthly trend
  const months = Object.entries(summary.byMonth)
    .sort((a, b) => a[0].localeCompare(b[0]));
    
  let trend = 0;
  let trendPercentage = 0;
  
  if (months.length >= 2) {
    const [, lastAmount] = months[months.length - 1];
    const [, previousAmount] = months[months.length - 2];
    
    trend = lastAmount - previousAmount;
    trendPercentage = previousAmount > 0 ? (trend / previousAmount) * 100 : 0;
  }

  // Get top category
  const categories = Object.entries(summary.byCategory)
    .sort((a, b) => b[1] - a[1]);
  
  const topCategory = categories.length > 0 
    ? { name: categories[0][0], amount: categories[0][1] }
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
      <Card className="p-6 glass border-border/50 hover:border-border transition-all duration-300">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Gastos Totais</p>
            <h3 className="text-2xl font-medium mt-1">{formatCurrency(summary.total)}</h3>
          </div>
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass border-border/50 hover:border-border transition-all duration-300">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Tendência Mensal</p>
            
            {months.length >= 2 ? (
              <>
                <h3 className="text-2xl font-medium mt-1">{formatCurrency(Math.abs(trend))}</h3>
                <div className="flex items-center mt-1">
                  {trend > 0 ? (
                    <>
                      <ArrowUpIcon className="h-4 w-4 text-destructive mr-1" />
                      <span className="text-xs text-destructive">{trendPercentage.toFixed(1)}% acima</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownIcon className="h-4 w-4 text-expense-green mr-1" />
                      <span className="text-xs text-expense-green">{Math.abs(trendPercentage).toFixed(1)}% abaixo</span>
                    </>
                  )}
                </div>
              </>
            ) : (
              <h3 className="text-2xl font-medium mt-1">--</h3>
            )}
          </div>
          
          <div className="p-3 rounded-full bg-secondary text-muted-foreground">
            {trend > 0 ? (
              <TrendingUp className="h-5 w-5" />
            ) : (
              <TrendingDown className="h-5 w-5" />
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6 glass border-border/50 hover:border-border transition-all duration-300">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Maior Categoria</p>
            {topCategory ? (
              <>
                <h3 className="text-2xl font-medium mt-1">{formatCurrency(topCategory.amount)}</h3>
                <p className="text-xs text-muted-foreground mt-1">{topCategory.name}</p>
              </>
            ) : (
              <h3 className="text-2xl font-medium mt-1">--</h3>
            )}
          </div>
          <div className="p-3 rounded-full bg-accent text-accent-foreground">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExpenseSummary;
