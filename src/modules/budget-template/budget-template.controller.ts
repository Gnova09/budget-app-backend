import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { BudgetTemplateService } from './budget-template.service.js';
import {
  CreateBudgetTemplateDto,
  TemplateCategoryDto,
  TemplateSavingCategoryDto,
  TemplateIncomeCategoryDto,
  UpdateCategoriesDto,
  UpdateSavingsCategoriesDto,
  UpdateIncomeCategoriesDto,
  UpdateTemplateCategoryDto,
} from './budget-template.dto.js';

@Controller('budget-template')
export class BudgetTemplateController {
  constructor(private readonly budgetTemplateService: BudgetTemplateService) {}

  @Post()
  create(@Body() dto: CreateBudgetTemplateDto) {
    return this.budgetTemplateService.create(dto);
  }

  @Get()
  findByUserId(@Query('userId') userId: string) {
    return this.budgetTemplateService.findByUserId(userId);
  }

  @Put(':id/categories')
  updateCategories(@Param('id') id: string, @Body() dto: UpdateCategoriesDto) {
    return this.budgetTemplateService.updateCategories(id, dto);
  }

  @Post(':id/categories')
  addCategory(@Param('id') id: string, @Body() category: TemplateCategoryDto) {
    return this.budgetTemplateService.addCategory(id, category);
  }

  @Patch(':id/categories/:categoryName')
  updateCategory(
    @Param('id') id: string,
    @Param('categoryName') categoryName: string,
    @Body() dto: UpdateTemplateCategoryDto,
  ) {
    return this.budgetTemplateService.updateCategory(id, categoryName, dto);
  }

  @Delete(':id/categories/:categoryName')
  removeCategory(@Param('id') id: string, @Param('categoryName') categoryName: string) {
    return this.budgetTemplateService.removeCategory(id, categoryName);
  }

  // Savings categories
  @Put(':id/savings-categories')
  updateSavingsCategories(@Param('id') id: string, @Body() dto: UpdateSavingsCategoriesDto) {
    return this.budgetTemplateService.updateSavingsCategories(id, dto);
  }

  @Post(':id/savings-categories')
  addSavingCategory(@Param('id') id: string, @Body() category: TemplateSavingCategoryDto) {
    return this.budgetTemplateService.addSavingCategory(id, category);
  }

  @Delete(':id/savings-categories/:categoryName')
  removeSavingCategory(@Param('id') id: string, @Param('categoryName') categoryName: string) {
    return this.budgetTemplateService.removeSavingCategory(id, categoryName);
  }

  // Income categories
  @Put(':id/income-categories')
  updateIncomeCategories(@Param('id') id: string, @Body() dto: UpdateIncomeCategoriesDto) {
    return this.budgetTemplateService.updateIncomeCategories(id, dto);
  }

  @Post(':id/income-categories')
  addIncomeCategory(@Param('id') id: string, @Body() category: TemplateIncomeCategoryDto) {
    return this.budgetTemplateService.addIncomeCategory(id, category);
  }

  @Delete(':id/income-categories/:categoryName')
  removeIncomeCategory(@Param('id') id: string, @Param('categoryName') categoryName: string) {
    return this.budgetTemplateService.removeIncomeCategory(id, categoryName);
  }
}
