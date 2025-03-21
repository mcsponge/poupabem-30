
import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Expense } from '@/types';
import { formatCurrency, formatDate, getCategoryColor } from '@/utils/expenseUtils';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <p className="text-muted-foreground mb-2">Nenhuma despesa registrada</p>
        <p className="text-sm text-muted-foreground">Adicione uma nova despesa clicando no botão acima</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      {expenses.map((expense, index) => (
        <Card 
          key={expense.id} 
          className="p-4 glass border-border/50 hover:border-border transition-all duration-300 animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: getCategoryColor(expense.category) }}
              >
                {expense.category.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium">{expense.description}</h3>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>{expense.category}</span>
                  <span>•</span>
                  <span>{formatDate(expense.date)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium">{formatCurrency(expense.amount)}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => onDeleteExpense(expense.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ExpenseList;
