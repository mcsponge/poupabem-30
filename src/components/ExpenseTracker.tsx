
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpenseForm from './ExpenseForm';
import ExpenseChart from './ExpenseChart';
import MonthlyGoal from './MonthlyGoal';
import AIAssistant from './AIAssistant';
import { mockExpenses, calculateExpenseSummary } from '@/utils/expenseUtils';
import { Expense, ExpenseSummary as ExpenseSummaryType } from '@/types';
import { toast } from 'sonner';

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummaryType>({ total: 0, byCategory: {}, byMonth: {} });
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Initialize with mock data
  useEffect(() => {
    setExpenses(mockExpenses);
  }, []);
  
  // Update summary when expenses change
  useEffect(() => {
    setSummary(calculateExpenseSummary(expenses));
  }, [expenses]);

  // Dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
    toast.success('Despesa adicionada com sucesso', {
      description: `${expense.description} - R$ ${expense.amount.toFixed(2)}`,
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white animate-fade-in">Poupabem</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1 animate-fade-in animate-delay-100">
              Controle inteligente de despesas
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleDarkMode}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-blue-500" />}
            </Button>
            <ExpenseForm onAddExpense={handleAddExpense} />
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Goal */}
          <div className="animate-fade-in animate-delay-200">
            <MonthlyGoal currentSpending={summary.total} />
          </div>
          
          {/* Expense Chart */}
          <div className="animate-fade-in animate-delay-300">
            <ExpenseChart summary={summary} />
          </div>
        </div>
      </div>
      
      {/* AI Assistant */}
      <AIAssistant expenses={expenses} summary={summary} />
    </div>
  );
};

export default ExpenseTracker;
