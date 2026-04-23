import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CategoryType } from '../../common/enums/category-type.enum.js';

export class TemplateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(CategoryType)
  type: CategoryType;

  @IsNumber()
  @Min(0)
  limit: number;
}

export class UpdateTemplateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(CategoryType)
  @IsOptional()
  type?: CategoryType;

  @IsNumber()
  @Min(0)
  @IsOptional()
  limit?: number;
}

export class TemplateSavingCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  targetAmount: number;
}

export class TemplateIncomeCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  expectedAmount: number;
}

export class CreateBudgetTemplateDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TemplateCategoryDto)
  categories: TemplateCategoryDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TemplateSavingCategoryDto)
  savingsCategories?: TemplateSavingCategoryDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TemplateIncomeCategoryDto)
  incomeCategories?: TemplateIncomeCategoryDto[];
}

export class UpdateCategoriesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TemplateCategoryDto)
  categories: TemplateCategoryDto[];
}

export class UpdateSavingsCategoriesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TemplateSavingCategoryDto)
  savingsCategories: TemplateSavingCategoryDto[];
}

export class UpdateIncomeCategoriesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TemplateIncomeCategoryDto)
  incomeCategories: TemplateIncomeCategoryDto[];
}
