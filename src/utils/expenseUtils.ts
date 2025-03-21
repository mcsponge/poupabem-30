
import { Expense, ExpenseSummary } from '../types';

export const defaultCategories = [
  { id: '1', name: 'Alimentação', color: '#EF4444' },
  { id: '2', name: 'Transporte', color: '#F59E0B' },
  { id: '3', name: 'Moradia', color: '#10B981' },
  { id: '4', name: 'Lazer', color: '#3B82F6' },
  { id: '5', name: 'Saúde', color: '#8B5CF6' },
  { id: '6', name: 'Educação', color: '#EC4899' },
  { id: '7', name: 'Outros', color: '#6B7280' },
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'Mercado',
    amount: 150.75,
    category: 'Alimentação',
    date: new Date(2023, 6, 15),
  },
  {
    id: '2',
    description: 'Gasolina',
    amount: 80.00,
    category: 'Transporte',
    date: new Date(2023, 6, 16),
  },
  {
    id: '3',
    description: 'Aluguel',
    amount: 1200.00,
    category: 'Moradia',
    date: new Date(2023, 6, 5),
  },
  {
    id: '4',
    description: 'Cinema',
    amount: 45.80,
    category: 'Lazer',
    date: new Date(2023, 6, 20),
  },
  {
    id: '5',
    description: 'Farmácia',
    amount: 65.30,
    category: 'Saúde',
    date: new Date(2023, 6, 22),
  },
];

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const getCategoryColor = (categoryName: string): string => {
  const category = defaultCategories.find(c => c.name === categoryName);
  return category?.color || '#6B7280';
};

export const calculateExpenseSummary = (expenses: Expense[]): ExpenseSummary => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const byCategory: { [category: string]: number } = {};
  const byMonth: { [month: string]: number } = {};
  
  expenses.forEach(expense => {
    // Sum by category
    const category = expense.category;
    byCategory[category] = (byCategory[category] || 0) + expense.amount;
    
    // Sum by month
    const monthYear = `${expense.date.getMonth() + 1}/${expense.date.getFullYear()}`;
    byMonth[monthYear] = (byMonth[monthYear] || 0) + expense.amount;
  });
  
  return { total, byCategory, byMonth };
};

export const generateCategoryPercentage = (byCategory: { [category: string]: number }, total: number) => {
  const result: { category: string; amount: number; percentage: number; color: string }[] = [];
  
  Object.entries(byCategory).forEach(([category, amount]) => {
    const percentage = total > 0 ? (amount / total) * 100 : 0;
    result.push({
      category,
      amount,
      percentage,
      color: getCategoryColor(category),
    });
  });
  
  return result.sort((a, b) => b.amount - a.amount);
};

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};
