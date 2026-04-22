import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MonthlyBudget } from '../monthly-budget/monthly-budget.schema.js';
import { Expense } from '../expense/expense.schema.js';
import { groupExpensesByCategory, CategorySummary } from '../../common/helpers/group-expenses.helper.js';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(MonthlyBudget.name) private monthlyBudgetModel: Model<MonthlyBudget>,
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}

  async getDashboard(month: string) {
    const budget = await this.monthlyBudgetModel.findOne({ month });
    if (!budget) {
      throw new NotFoundException('No monthly budget found for this month');
    }

    const expenses = await this.expenseModel.find({ month });
    const spentByCategory = groupExpensesByCategory(expenses);

    const categories: CategorySummary[] = budget.categories.map((cat) => {
      const spent = spentByCategory[cat.name] || 0;
      return {
        category: cat.name,
        limit: cat.limit,
        spent,
        available: cat.limit - spent,
      };
    });

    const totalBudget = categories.reduce((sum, c) => sum + c.limit, 0);
    const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);

    return {
      totalBudget,
      totalSpent,
      categories,
    };
  }
}
