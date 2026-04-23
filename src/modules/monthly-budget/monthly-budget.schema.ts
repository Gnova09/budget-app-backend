import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryType } from '../../common/enums/category-type.enum.js';

class MonthlyBudgetCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: CategoryType })
  type: CategoryType;

  @Prop({ required: true })
  limit: number;
}

class MonthlyBudgetSavingCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  targetAmount: number;
}

class MonthlyBudgetIncomeCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  expectedAmount: number;
}

@Schema({ timestamps: true })
export class MonthlyBudget extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  month: string;

  @Prop({
    type: [{ name: String, type: { type: String, enum: CategoryType }, limit: Number }],
    required: true,
  })
  categories: MonthlyBudgetCategory[];

  @Prop({
    type: [{ name: String, targetAmount: Number }],
    default: [],
  })
  savingsCategories: MonthlyBudgetSavingCategory[];

  @Prop({
    type: [{ name: String, expectedAmount: Number }],
    default: [],
  })
  incomeCategories: MonthlyBudgetIncomeCategory[];

  @Prop({ default: true })
  generatedFromTemplate: boolean;
}

export const MonthlyBudgetSchema = SchemaFactory.createForClass(MonthlyBudget);
