import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BudgetTemplate } from './budget-template.schema.js';
import {
  CreateBudgetTemplateDto,
  TemplateCategoryDto,
  UpdateCategoriesDto,
  UpdateTemplateCategoryDto,
} from './budget-template.dto.js';

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

  async updateCategories(templateId: string, dto: UpdateCategoriesDto): Promise<BudgetTemplate> {
    const template = await this.budgetTemplateModel.findByIdAndUpdate(
      templateId,
      { $set: { categories: dto.categories } },
      { new: true },
    );
    if (!template) throw new NotFoundException('Budget template not found');
    return template;
  }

  async addCategory(templateId: string, category: TemplateCategoryDto): Promise<BudgetTemplate> {
    const template = await this.budgetTemplateModel.findByIdAndUpdate(
      templateId,
      { $push: { categories: category } },
      { new: true },
    );
    if (!template) throw new NotFoundException('Budget template not found');
    return template;
  }

  async updateCategory(
    templateId: string,
    categoryName: string,
    dto: UpdateTemplateCategoryDto,
  ): Promise<BudgetTemplate> {
    const updateFields: Record<string, any> = {};
    if (dto.name !== undefined) updateFields['categories.$.name'] = dto.name;
    if (dto.type !== undefined) updateFields['categories.$.type'] = dto.type;
    if (dto.limit !== undefined) updateFields['categories.$.limit'] = dto.limit;

    const template = await this.budgetTemplateModel.findOneAndUpdate(
      { _id: templateId, 'categories.name': categoryName },
      { $set: updateFields },
      { new: true },
    );
    if (!template) throw new NotFoundException('Template or category not found');
    return template;
  }

  async removeCategory(templateId: string, categoryName: string): Promise<BudgetTemplate> {
    const template = await this.budgetTemplateModel.findByIdAndUpdate(
      templateId,
      { $pull: { categories: { name: categoryName } } },
      { new: true },
    );
    if (!template) throw new NotFoundException('Budget template not found');
    return template;
  }
}
