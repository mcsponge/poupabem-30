
export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
};

export type ExpenseCategory = {
  id: string;
  name: string;
  color: string;
};

export type ExpenseSummary = {
  total: number;
  byCategory: { [category: string]: number };
  byMonth: { [month: string]: number };
};

export type AIAnalysis = {
  insights: string[];
  suggestions: string[];
  loading?: boolean;
};
