import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Income } from './income.schema.js';
import { CreateIncomeDto } from './income.dto.js';

@Injectable()
export class IncomeService {
  constructor(@InjectModel(Income.name) private incomeModel: Model<Income>) {}

  async create(dto: CreateIncomeDto): Promise<Income> {
    try {
      const month = dto.date.substring(0, 7);
      return await this.incomeModel.create({ ...dto, month });
    } catch (error) {
      throw new InternalServerErrorException('Error creating income');
    }
  }

  async findByMonth(month: string): Promise<Income[]> {
    try {
      return await this.incomeModel.find({ month });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching incomes');
    }
  }

  async delete(id: string): Promise<Income> {
    try {
      const income = await this.incomeModel.findByIdAndDelete(id);
      if (!income) {
        throw new NotFoundException('Income not found');
      }
      return income;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting income');
    }
  }
}
