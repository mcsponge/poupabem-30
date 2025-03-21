
import React, { useState, useEffect } from 'react';
import { CalendarIcon, ListIcon, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseChart from './ExpenseChart';
import ExpenseSummary from './ExpenseSummary';
import AIAssistant from './AIAssistant';
import { mockExpenses, calculateExpenseSummary } from '@/utils/expenseUtils';
import { Expense, ExpenseSummary as ExpenseSummaryType } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummaryType>({ total: 0, byCategory: {}, byMonth: {} });
  
  // Initialize with mock data
  useEffect(() => {
    setExpenses(mockExpenses);
  }, []);
  
  // Update summary when expenses change
  useEffect(() => {
    setSummary(calculateExpenseSummary(expenses));
  }, [expenses]);
  
  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
    toast.success('Despesa adicionada com sucesso', {
      description: `${expense.description} - R$ ${expense.amount.toFixed(2)}`,
    });
  };
  
  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    toast.success('Despesa removida com sucesso');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-fade-in">Controle de Despesas</h1>
          <p className="text-muted-foreground mt-1 animate-fade-in animate-delay-100">
            Gerencie suas despesas com facilidade e obtenha insights valiosos
          </p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto justify-end">
          <Button variant="outline" className="animate-fade-in animate-delay-200">
            <Settings className="h-4 w-4 mr-2" />
            <span>Configurações</span>
          </Button>
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>
      </div>
      
      <ExpenseSummary summary={summary} />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="list" className="animate-fade-in animate-delay-300">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="glass">
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <ListIcon className="h-4 w-4" />
                  <span>Lista</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Calendário</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="list" className="mt-0">
              <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
            </TabsContent>
            
            <TabsContent value="calendar" className="mt-0">
              <div className="glass border-border/50 rounded-lg p-6 text-center animate-fade-in">
                <p className="text-muted-foreground">Visualização do calendário em breve</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="animate-fade-in animate-delay-400">
          <ExpenseChart summary={summary} />
        </div>
      </div>
      
      <AIAssistant expenses={expenses} summary={summary} />
    </div>
  );
};

export default ExpenseTracker;
