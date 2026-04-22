export interface CategorySummary {
  category: string;
  limit: number;
  spent: number;
  available: number;
}

export function groupExpensesByCategory(expenses: { category: string; amount: number }[]): Record<string, number> {
  const grouped: Record<string, number> = {};
  for (const expense of expenses) {
    const cat = expense.category;
    grouped[cat] = (grouped[cat] || 0) + expense.amount;
  }
  return grouped;
}
