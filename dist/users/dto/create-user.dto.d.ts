import { UserStatusEnum, UserRoleEnum } from '../entities/user.entity';
export declare class CreateUserDto {
    username: string;
    phone: string;
    email: string;
    role: UserRoleEnum;
    status: UserStatusEnum;
    password: string;
}
