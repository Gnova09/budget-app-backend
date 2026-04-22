import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget } from './budget.schema';
import { CreateBudgetDto } from './budget.dto';

@Injectable()
export class BudgetService {
  constructor(@InjectModel(Budget.name) private budgetModel: Model<Budget>) {}

  async create(dto: CreateBudgetDto): Promise<Budget> {
    try {
      return await this.budgetModel.create(dto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating budget');
    }
  }

  async findByMonth(month: string): Promise<Budget | null> {
    try {
      return await this.budgetModel.findOne({ month });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching budget');
    }
  }
}
