import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';
import { CategoryType } from '../../common/enums/category-type.enum.js';

export class MonthlyBudgetCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(CategoryType)
  type: CategoryType;

  @IsNumber()
  @Min(0)
  limit: number;
}

export class CreateMonthlyBudgetDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}$/, { message: 'month must be in YYYY-MM format' })
  month: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MonthlyBudgetCategoryDto)
  categories: MonthlyBudgetCategoryDto[];
}
