import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryType } from '../../common/enums/category-type.enum.js';

class TemplateCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: CategoryType })
  type: CategoryType;

  @Prop({ required: true })
  limit: number;
}

class TemplateSavingCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  targetAmount: number;
}

class TemplateIncomeCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  expectedAmount: number;
}

@Schema({ timestamps: true })
export class BudgetTemplate extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ name: String, type: { type: String, enum: CategoryType }, limit: Number }],
    required: true,
  })
  categories: TemplateCategory[];

  @Prop({
    type: [{ name: String, targetAmount: Number }],
    default: [],
  })
  savingsCategories: TemplateSavingCategory[];

  @Prop({
    type: [{ name: String, expectedAmount: Number }],
    default: [],
  })
  incomeCategories: TemplateIncomeCategory[];
}

export const BudgetTemplateSchema = SchemaFactory.createForClass(BudgetTemplate);
