import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { BudgetTemplateService } from './budget-template.service.js';
import {
  CreateBudgetTemplateDto,
  TemplateCategoryDto,
  UpdateCategoriesDto,
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
}
