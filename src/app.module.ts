import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './database/mongoose.config.js';
import { ExpenseModule } from './modules/expense/expense.module.js';
import { BudgetModule } from './modules/budget/budget.module.js';
import { MonthlyBudgetModule } from './modules/monthly-budget/monthly-budget.module.js';
import { BudgetTemplateModule } from './modules/budget-template/budget-template.module.js';
import { DashboardModule } from './modules/dashboard/dashboard.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync(mongooseConfig),
    ExpenseModule,
    BudgetModule,
    MonthlyBudgetModule,
    BudgetTemplateModule,
    DashboardModule,
  ],
})
export class AppModule {}
