import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Saving } from './saving.schema.js';
import { CreateSavingDto } from './saving.dto.js';

@Injectable()
export class SavingService {
  constructor(@InjectModel(Saving.name) private savingModel: Model<Saving>) {}

  async create(dto: CreateSavingDto): Promise<Saving> {
    try {
      const month = dto.date.substring(0, 7);
      return await this.savingModel.create({ ...dto, month });
    } catch (error) {
      throw new InternalServerErrorException('Error creating saving');
    }
  }

  async findByMonth(month: string): Promise<Saving[]> {
    try {
      return await this.savingModel.find({ month });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching savings');
    }
  }

  async delete(id: string): Promise<Saving> {
    try {
      const saving = await this.savingModel.findByIdAndDelete(id);
      if (!saving) {
        throw new NotFoundException('Saving not found');
      }
      return saving;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting saving');
    }
  }
}
