import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetTemplate, BudgetTemplateSchema } from './budget-template.schema.js';
import { BudgetTemplateController } from './budget-template.controller.js';
import { BudgetTemplateService } from './budget-template.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BudgetTemplate.name, schema: BudgetTemplateSchema }]),
  ],
  controllers: [BudgetTemplateController],
  providers: [BudgetTemplateService],
  exports: [BudgetTemplateService],
})
export class BudgetTemplateModule {}
