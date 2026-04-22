import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class BudgetCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  limit: number;
}

@Schema({ timestamps: true })
export class Budget extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  month: string;

  @Prop({ type: [{ name: String, limit: Number }], required: true })
  categories: BudgetCategory[];
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
