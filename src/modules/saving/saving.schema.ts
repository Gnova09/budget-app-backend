import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Saving extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  month: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop()
  note: string;
}

export const SavingSchema = SchemaFactory.createForClass(Saving);
