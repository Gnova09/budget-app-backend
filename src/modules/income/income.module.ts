import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Income, IncomeSchema } from './income.schema.js';
import { IncomeController } from './income.controller.js';
import { IncomeService } from './income.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Income.name, schema: IncomeSchema }])],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
