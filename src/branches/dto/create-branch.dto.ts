import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBranchDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  @IsNumber()
  @IsOptional()
  @Min(10)
  @Max(100)
  houseEdge?: number;
}

export class UpdateBranchDto extends PartialType(CreateBranchDto) {}
