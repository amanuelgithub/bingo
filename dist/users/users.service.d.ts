import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStatusEnum, UserRoleEnum } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    createSuperAdmin(): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<string>;
    findAll(): string;
    findOne(id: string): Promise<{
        id: string;
        username: string;
        phone: string;
        email: string;
        isEmailVerified: boolean;
        role: UserRoleEnum;
        status: UserStatusEnum;
        createdAt: Date;
        modifiedAt: Date;
        agent: import("../agents/entities/agent.entity").Agent;
        cashier: import("../cashiers/entities/cashier.entity").Cashier;
    }>;
    findOneByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
