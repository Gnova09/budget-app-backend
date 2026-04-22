import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './expense.schema.js';
import { CreateExpenseDto } from './expense.dto.js';

@Injectable()
export class ExpenseService {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<Expense>) {}

  async create(dto: CreateExpenseDto): Promise<Expense> {
    try {
      const month = dto.date.substring(0, 7);
      return await this.expenseModel.create({ ...dto, month });
    } catch (error) {
      throw new InternalServerErrorException('Error creating expense');
    }
  }

  async findByMonth(month: string): Promise<Expense[]> {
    try {
      return await this.expenseModel.find({ month });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching expenses');
    }
  }

  async delete(id: string): Promise<Expense> {
    try {
      const expense = await this.expenseModel.findByIdAndDelete(id);
      if (!expense) {
        throw new NotFoundException('Expense not found');
      }
      return expense;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting expense');
    }
  }
}
