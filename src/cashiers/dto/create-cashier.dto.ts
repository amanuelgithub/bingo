import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateCashierDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  branchId: string;
}
