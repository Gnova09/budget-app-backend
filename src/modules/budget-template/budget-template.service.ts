import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BudgetTemplate } from './budget-template.schema.js';
import { CreateBudgetTemplateDto } from './budget-template.dto.js';

@Injectable()
export class BudgetTemplateService {
  constructor(
    @InjectModel(BudgetTemplate.name) private budgetTemplateModel: Model<BudgetTemplate>,
  ) {}

  async create(dto: CreateBudgetTemplateDto): Promise<BudgetTemplate> {
    try {
      return await this.budgetTemplateModel.create(dto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating budget template');
    }
  }

  async findByUserId(userId: string): Promise<BudgetTemplate[]> {
    try {
      return await this.budgetTemplateModel.find({ userId });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching budget templates');
    }
  }
}
