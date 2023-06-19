import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  // IsInt,
} from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  branchId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(5, { each: true })
  @ArrayMaxSize(5, { each: true })
  // @IsInt({ each: true })
  numbers: number[][];
}
