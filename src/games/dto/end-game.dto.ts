import { IsNotEmpty, IsString } from 'class-validator';

export class EndGameDto {
  @IsNotEmpty()
  @IsString()
  gameId: string;
}
