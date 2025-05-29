import { Expense, ExpenseSummary } from '../types';

export const defaultCategories = [
  { id: '1', name: 'Alimentação', color: '#FF6B6B' },
  { id: '2', name: 'Transporte', color: '#4ECDC4' },
  { id: '3', name: 'Moradia', color: '#45B7D1' },
  { id: '4', name: 'Lazer', color: '#96CEB4' },
  { id: '5', name: 'Saúde', color: '#FFEAA7' },
  { id: '6', name: 'Educação', color: '#DDA0DD' },
  { id: '7', name: 'Outros', color: '#98D8C8' },
];

export const mockExpenses: Expense[] = [
  // Janeiro 2024
  {
    id: '1',
    description: 'Mercado',
    amount: 150.75,
    category: 'Alimentação',
    date: new Date(2024, 0, 15),
  },
  {
    id: '2',
    description: 'Gasolina',
    amount: 80.00,
    category: 'Transporte',
    date: new Date(2024, 0, 16),
  },
  {
    id: '3',
    description: 'Aluguel',
    amount: 1200.00,
    category: 'Moradia',
    date: new Date(2024, 0, 5),
  },
  // Fevereiro 2024
  {
    id: '4',
    description: 'Cinema',
    amount: 45.80,
    category: 'Lazer',
    date: new Date(2024, 1, 20),
  },
  {
    id: '5',
    description: 'Farmácia',
    amount: 65.30,
    category: 'Saúde',
    date: new Date(2024, 1, 22),
  },
  {
    id: '6',
    description: 'Supermercado',
    amount: 180.50,
    category: 'Alimentação',
    date: new Date(2024, 1, 10),
  },
  // Março 2024
  {
    id: '7',
    description: 'Uber',
    amount: 25.00,
    category: 'Transporte',
    date: new Date(2024, 2, 8),
  },
  {
    id: '8',
    description: 'Restaurante',
    amount: 85.90,
    category: 'Alimentação',
    date: new Date(2024, 2, 15),
  },
  {
    id: '9',
    description: 'Academia',
    amount: 120.00,
    category: 'Saúde',
    date: new Date(2024, 2, 1),
  },
  // Abril 2024
  {
    id: '10',
    description: 'Livros',
    amount: 75.00,
    category: 'Educação',
    date: new Date(2024, 3, 12),
  },
  {
    id: '11',
    description: 'Feira',
    amount: 95.40,
    category: 'Alimentação',
    date: new Date(2024, 3, 18),
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
    
    // Sum by month (format: MM/YYYY)
    const monthYear = `${String(expense.date.getMonth() + 1).padStart(2, '0')}/${expense.date.getFullYear()}`;
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
