import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class CreateAgentDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  branchId: string;
}
