import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MonthlyBudget } from './monthly-budget.schema.js';
import { CreateMonthlyBudgetDto } from './monthly-budget.dto.js';
import { BudgetTemplate } from '../budget-template/budget-template.schema.js';

@Injectable()
export class MonthlyBudgetService {
  constructor(
    @InjectModel(MonthlyBudget.name) private monthlyBudgetModel: Model<MonthlyBudget>,
    @InjectModel(BudgetTemplate.name) private budgetTemplateModel: Model<BudgetTemplate>,
  ) {}

  async create(dto: CreateMonthlyBudgetDto): Promise<MonthlyBudget> {
    try {
      return await this.monthlyBudgetModel.create({ ...dto, generatedFromTemplate: false });
    } catch (error) {
      throw new InternalServerErrorException('Error creating monthly budget');
    }
  }

  async findByMonth(month: string): Promise<MonthlyBudget | null> {
    try {
      return await this.monthlyBudgetModel.findOne({ month });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching monthly budget');
    }
  }

  async generateMonthlyBudget(userId: string, month: string): Promise<MonthlyBudget> {
    const existing = await this.monthlyBudgetModel.findOne({ userId, month });
    if (existing) return existing;

    const template = await this.budgetTemplateModel.findOne({ userId });
    if (!template) {
      throw new NotFoundException('No budget template found for this user');
    }

    const categories = template.categories.map((cat) => ({
      name: cat.name,
      type: cat.type,
      limit: cat.limit,
    }));

    return await this.monthlyBudgetModel.create({
      userId,
      month,
      categories,
      generatedFromTemplate: true,
    });
  }
}
