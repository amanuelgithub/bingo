import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SellCardDto {
  @IsNotEmpty()
  @IsString()
  branchId: string;

  @IsNotEmpty()
  @IsString()
  cashierId: string;

  @IsNotEmpty()
  @IsString()
  gameId: string;

  @IsNotEmpty()
  @IsString()
  cardId: string;

  @IsNotEmpty()
  @IsNumber()
  money: number;
}
