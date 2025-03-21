
import { Expense, ExpenseSummary, AIAnalysis } from '../types';

// Simulate AI analysis with predefined insights and suggestions
export const analyzeExpenses = (expenses: Expense[], summary: ExpenseSummary): Promise<AIAnalysis> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const insights = generateInsights(expenses, summary);
      const suggestions = generateSuggestions(expenses, summary);
      
      resolve({ insights, suggestions });
    }, 1500);
  });
};

const generateInsights = (expenses: Expense[], summary: ExpenseSummary): string[] => {
  const insights: string[] = [];
  
  // Total spending
  insights.push(`Você gastou um total de R$ ${summary.total.toFixed(2)} no período analisado.`);
  
  // Category with highest expenses
  const categories = Object.entries(summary.byCategory)
    .sort((a, b) => b[1] - a[1]);
  
  if (categories.length > 0) {
    const [topCategory, topAmount] = categories[0];
    const percentage = (topAmount / summary.total) * 100;
    insights.push(`Sua maior categoria de gasto é "${topCategory}" com R$ ${topAmount.toFixed(2)} (${percentage.toFixed(1)}% do total).`);
  }
  
  // Monthly trend
  const months = Object.entries(summary.byMonth)
    .sort((a, b) => a[0].localeCompare(b[0]));
  
  if (months.length >= 2) {
    const [lastMonth, lastAmount] = months[months.length - 1];
    const [previousMonth, previousAmount] = months[months.length - 2];
    
    const difference = lastAmount - previousAmount;
    const percentChange = (difference / previousAmount) * 100;
    
    if (difference > 0) {
      insights.push(`Seus gastos aumentaram ${percentChange.toFixed(1)}% em relação ao mês anterior.`);
    } else if (difference < 0) {
      insights.push(`Seus gastos diminuíram ${Math.abs(percentChange).toFixed(1)}% em relação ao mês anterior.`);
    } else {
      insights.push(`Seus gastos se mantiveram estáveis em relação ao mês anterior.`);
    }
  }
  
  // Average expense
  if (expenses.length > 0) {
    const average = summary.total / expenses.length;
    insights.push(`O valor médio por despesa é de R$ ${average.toFixed(2)}.`);
  }
  
  return insights;
};

const generateSuggestions = (expenses: Expense[], summary: ExpenseSummary): string[] => {
  const suggestions: string[] = [];
  
  // Category with highest expenses
  const categories = Object.entries(summary.byCategory)
    .sort((a, b) => b[1] - a[1]);
  
  if (categories.length > 0) {
    const [topCategory] = categories[0];
    suggestions.push(`Considere reduzir gastos em "${topCategory}" definindo um orçamento mensal.`);
  }
  
  // Frequent small expenses
  const smallExpenses = expenses.filter(e => e.amount < 20);
  if (smallExpenses.length >= 3) {
    suggestions.push(`Você tem ${smallExpenses.length} gastos pequenos que somam R$ ${smallExpenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}. Considere reduzir estas despesas recorrentes.`);
  }
  
  // Budget recommendation
  suggestions.push(`Com base nos seus gastos atuais, um orçamento mensal recomendado seria de R$ ${(summary.total * 0.9).toFixed(2)}.`);
  
  // Savings suggestion
  suggestions.push(`Se economizar 10% da sua renda mensal, em 12 meses você terá guardado o equivalente a ${(summary.total * 1.2).toFixed(2)}.`);
  
  return suggestions;
};
