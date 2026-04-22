import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonthlyBudget, MonthlyBudgetSchema } from '../monthly-budget/monthly-budget.schema.js';
import { Expense, ExpenseSchema } from '../expense/expense.schema.js';
import { DashboardController } from './dashboard.controller.js';
import { DashboardService } from './dashboard.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MonthlyBudget.name, schema: MonthlyBudgetSchema },
      { name: Expense.name, schema: ExpenseSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
