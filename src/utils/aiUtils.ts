
import { Expense, ExpenseSummary, AIAnalysis } from '../types';

// Simulate AI analysis with enhanced insights and suggestions
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

// Enhanced analysis with more detailed insights
export const getMoreInsights = (expenses: Expense[], summary: ExpenseSummary): Promise<AIAnalysis> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const insights = generateDetailedInsights(expenses, summary);
      const suggestions = generateAdvancedSuggestions(expenses, summary);
      
      resolve({ insights, suggestions });
    }, 2000);
  });
};

const generateInsights = (expenses: Expense[], summary: ExpenseSummary): string[] => {
  const insights: string[] = [];
  
  if (expenses.length === 0) {
    insights.push("Comece adicionando suas despesas para receber análises personalizadas!");
    return insights;
  }
  
  // Total spending analysis
  insights.push(`💰 Você gastou um total de R$ ${summary.total.toFixed(2)} no período analisado.`);
  
  // Category analysis
  const categories = Object.entries(summary.byCategory)
    .sort((a, b) => b[1] - a[1]);
  
  if (categories.length > 0) {
    const [topCategory, topAmount] = categories[0];
    const percentage = (topAmount / summary.total) * 100;
    insights.push(`🎯 Sua maior categoria de gasto é "${topCategory}" com R$ ${topAmount.toFixed(2)} (${percentage.toFixed(1)}% do total).`);
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
      insights.push(`📈 Seus gastos aumentaram ${percentChange.toFixed(1)}% em relação ao mês anterior.`);
    } else if (difference < 0) {
      insights.push(`📉 Seus gastos diminuíram ${Math.abs(percentChange).toFixed(1)}% em relação ao mês anterior.`);
    }
  }
  
  return insights;
};

const generateDetailedInsights = (expenses: Expense[], summary: ExpenseSummary): string[] => {
  const insights: string[] = [];
  
  if (expenses.length === 0) {
    insights.push("📊 Adicione mais despesas para uma análise mais profunda!");
    return insights;
  }
  
  // Spending patterns analysis
  const dailyAverage = summary.total / 30;
  insights.push(`💳 Seu gasto médio diário é de R$ ${dailyAverage.toFixed(2)}.`);
  
  // Frequency analysis
  const expensesByDay = expenses.reduce((acc, expense) => {
    const day = expense.date.getDay();
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const mostActiveDay = Object.entries(expensesByDay)
    .sort((a, b) => b[1] - a[1])[0];
  
  if (mostActiveDay) {
    insights.push(`📅 Você gasta mais frequentemente às ${dayNames[parseInt(mostActiveDay[0])]}s (${mostActiveDay[1]} transações).`);
  }
  
  // High-value transactions
  const highValueExpenses = expenses.filter(e => e.amount > summary.total / expenses.length * 2);
  if (highValueExpenses.length > 0) {
    insights.push(`💸 Você tem ${highValueExpenses.length} gastos acima da média que representam R$ ${highValueExpenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}.`);
  }
  
  // Category diversity
  const categoryCount = Object.keys(summary.byCategory).length;
  if (categoryCount <= 2) {
    insights.push(`📋 Seus gastos estão concentrados em apenas ${categoryCount} categoria(s). Considere categorizar melhor.`);
  } else if (categoryCount >= 5) {
    insights.push(`🎨 Você tem uma boa diversificação com ${categoryCount} categorias diferentes de gastos.`);
  }
  
  // Spending velocity
  const recentExpenses = expenses.filter(e => {
    const daysDiff = (new Date().getTime() - e.date.getTime()) / (1000 * 3600 * 24);
    return daysDiff <= 7;
  });
  
  if (recentExpenses.length > 0) {
    const recentTotal = recentExpenses.reduce((sum, e) => sum + e.amount, 0);
    insights.push(`⚡ Na última semana você gastou R$ ${recentTotal.toFixed(2)} em ${recentExpenses.length} transações.`);
  }
  
  return insights;
};

const generateSuggestions = (expenses: Expense[], summary: ExpenseSummary): string[] => {
  const suggestions: string[] = [];
  
  if (expenses.length === 0) {
    suggestions.push("🚀 Comece registrando seus gastos diários para receber dicas personalizadas!");
    return suggestions;
  }
  
  // Category optimization
  const categories = Object.entries(summary.byCategory)
    .sort((a, b) => b[1] - a[1]);
  
  if (categories.length > 0) {
    const [topCategory] = categories[0];
    suggestions.push(`💡 Considere definir um limite mensal para "${topCategory}" e acompanhe semanalmente.`);
  }
  
  // Small expenses accumulation
  const smallExpenses = expenses.filter(e => e.amount < 20);
  if (smallExpenses.length >= 3) {
    const smallTotal = smallExpenses.reduce((sum, e) => sum + e.amount, 0);
    suggestions.push(`🧮 Seus pequenos gastos somam R$ ${smallTotal.toFixed(2)}. Considere usar a regra dos R$ 10 antes de comprar.`);
  }
  
  // Budget recommendation
  suggestions.push(`📊 Defina um orçamento mensal de R$ ${(summary.total * 0.9).toFixed(2)} para reduzir gastos em 10%.`);
  
  return suggestions;
};

const generateAdvancedSuggestions = (expenses: Expense[], summary: ExpenseSummary): string[] => {
  const suggestions: string[] = [];
  
  if (expenses.length === 0) {
    suggestions.push("🎯 Use o método 50-30-20: 50% necessidades, 30% desejos, 20% poupança!");
    return suggestions;
  }
  
  // Advanced budgeting strategies
  suggestions.push(`🎯 Aplique a regra 50-30-20: R$ ${(summary.total * 0.5).toFixed(2)} para necessidades, R$ ${(summary.total * 0.3).toFixed(2)} para desejos.`);
  
  // Emergency fund calculation
  const monthlyAverage = summary.total;
  suggestions.push(`🛡️ Monte uma reserva de emergência de R$ ${(monthlyAverage * 6).toFixed(2)} (6 meses de gastos).`);
  
  // Investment opportunity
  const potentialSavings = summary.total * 0.1;
  suggestions.push(`📈 Se economizar 10% dos gastos (R$ ${potentialSavings.toFixed(2)}), pode investir e ter R$ ${(potentialSavings * 12 * 1.1).toFixed(2)} em 1 ano.`);
  
  // Category-specific tips
  const categories = Object.entries(summary.byCategory)
    .sort((a, b) => b[1] - a[1]);
    
  categories.slice(0, 3).forEach(([category, amount]) => {
    switch (category.toLowerCase()) {
      case 'alimentação':
        suggestions.push(`🍽️ Para alimentação: planeje refeições semanais e compre com lista. Economia estimada: R$ ${(amount * 0.15).toFixed(2)}.`);
        break;
      case 'transporte':
        suggestions.push(`🚗 Para transporte: considere carona solidária ou transporte público. Economia estimada: R$ ${(amount * 0.2).toFixed(2)}.`);
        break;
      case 'lazer':
        suggestions.push(`🎮 Para lazer: procure atividades gratuitas como parques e eventos culturais. Economia estimada: R$ ${(amount * 0.25).toFixed(2)}.`);
        break;
      default:
        suggestions.push(`💰 Para ${category}: compare preços e procure promoções. Economia estimada: R$ ${(amount * 0.1).toFixed(2)}.`);
    }
  });
  
  // Behavioral insights
  const weekendExpenses = expenses.filter(e => e.date.getDay() === 0 || e.date.getDay() === 6);
  if (weekendExpenses.length > 0) {
    const weekendTotal = weekendExpenses.reduce((sum, e) => sum + e.amount, 0);
    suggestions.push(`🏖️ Você gasta R$ ${weekendTotal.toFixed(2)} nos fins de semana. Planeje atividades mais econômicas.`);
  }
  
  return suggestions;
};
