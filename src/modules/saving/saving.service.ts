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

  async getSummaryByUserId(userId: string) {
    try {
      const [result] = await this.savingModel.aggregate([
        { $match: { userId } },
        {
          $facet: {
            total: [{ $group: { _id: null, amount: { $sum: '$amount' } } }],
            byCategory: [
              { $group: { _id: '$category', amount: { $sum: '$amount' } } },
              { $project: { _id: 0, category: '$_id', amount: 1 } },
              { $sort: { amount: -1 } },
            ],
            byMonth: [
              { $group: { _id: '$month', amount: { $sum: '$amount' } } },
              { $project: { _id: 0, month: '$_id', amount: 1 } },
              { $sort: { month: -1 } },
            ],
          },
        },
      ]);

      return {
        total: result.total[0]?.amount ?? 0,
        byCategory: result.byCategory,
        byMonth: result.byMonth,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching savings summary');
    }
  }
}
