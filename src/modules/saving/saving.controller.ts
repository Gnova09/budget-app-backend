import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { SavingService } from './saving.service.js';
import { CreateSavingDto } from './saving.dto.js';

@Controller('savings')
export class SavingController {
  constructor(private readonly savingService: SavingService) {}

  @Post()
  create(@Body() dto: CreateSavingDto) {
    return this.savingService.create(dto);
  }

  @Get('summary')
  getSummary(@Query('userId') userId: string) {
    return this.savingService.getSummaryByUserId(userId);
  }

  @Get()
  findByMonth(@Query('month') month: string) {
    return this.savingService.findByMonth(month);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.savingService.delete(id);
  }
}
