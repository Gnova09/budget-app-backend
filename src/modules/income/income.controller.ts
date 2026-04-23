import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { IncomeService } from './income.service.js';
import { CreateIncomeDto } from './income.dto.js';

@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  create(@Body() dto: CreateIncomeDto) {
    return this.incomeService.create(dto);
  }

  @Get()
  findByMonth(@Query('month') month: string) {
    return this.incomeService.findByMonth(month);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.incomeService.delete(id);
  }
}
