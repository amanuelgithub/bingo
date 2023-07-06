import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createSuperAdmin(): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<string>;
    findAll(): string;
    findOne(id: string): Promise<{
        id: string;
        username: string;
        phone: string;
        email: string;
        isEmailVerified: boolean;
        role: import("./entities/user.entity").UserRoleEnum;
        status: import("./entities/user.entity").UserStatusEnum;
        createdAt: Date;
        modifiedAt: Date;
        agent: import("../agents/entities/agent.entity").Agent;
        cashier: import("../cashiers/entities/cashier.entity").Cashier;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
