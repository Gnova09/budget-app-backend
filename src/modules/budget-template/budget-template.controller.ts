import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BudgetTemplateService } from './budget-template.service.js';
import { CreateBudgetTemplateDto } from './budget-template.dto.js';

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
}
