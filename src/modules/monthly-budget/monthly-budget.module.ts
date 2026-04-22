import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonthlyBudget, MonthlyBudgetSchema } from './monthly-budget.schema.js';
import { MonthlyBudgetController } from './monthly-budget.controller.js';
import { MonthlyBudgetService } from './monthly-budget.service.js';
import { BudgetTemplate, BudgetTemplateSchema } from '../budget-template/budget-template.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MonthlyBudget.name, schema: MonthlyBudgetSchema },
      { name: BudgetTemplate.name, schema: BudgetTemplateSchema },
    ]),
  ],
  controllers: [MonthlyBudgetController],
  providers: [MonthlyBudgetService],
  exports: [MonthlyBudgetService],
})
export class MonthlyBudgetModule {}
