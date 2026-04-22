import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MonthlyBudgetService } from './monthly-budget.service.js';
import { CreateMonthlyBudgetDto } from './monthly-budget.dto.js';

@Controller('monthly-budget')
export class MonthlyBudgetController {
  constructor(private readonly monthlyBudgetService: MonthlyBudgetService) {}

  @Post()
  create(@Body() dto: CreateMonthlyBudgetDto) {
    return this.monthlyBudgetService.create(dto);
  }

  @Get()
  findByMonth(@Query('month') month: string) {
    return this.monthlyBudgetService.findByMonth(month);
  }

  @Post('generate')
  generate(@Body() body: { userId: string; month: string }) {
    return this.monthlyBudgetService.generateMonthlyBudget(body.userId, body.month);
  }
}
