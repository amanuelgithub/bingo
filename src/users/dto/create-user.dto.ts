import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
  //   IsPhoneNumber,
  IsEnum,
} from 'class-validator';
import { UserStatusEnum, UserRoleEnum } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @IsNotEmpty()
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'weak password! make it strong!',
  })
  password: string;
}
