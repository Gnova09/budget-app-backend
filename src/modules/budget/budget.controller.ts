import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './budget.dto';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  create(@Body() dto: CreateBudgetDto) {
    return this.budgetService.create(dto);
  }

  @Get()
  findByMonth(@Query('month') month: string) {
    return this.budgetService.findByMonth(month);
  }
}
