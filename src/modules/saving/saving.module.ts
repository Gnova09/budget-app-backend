import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Saving, SavingSchema } from './saving.schema.js';
import { SavingController } from './saving.controller.js';
import { SavingService } from './saving.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Saving.name, schema: SavingSchema }])],
  controllers: [SavingController],
  providers: [SavingService],
})
export class SavingModule {}
