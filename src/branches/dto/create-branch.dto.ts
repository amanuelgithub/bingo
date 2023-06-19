import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBranchDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;
}
