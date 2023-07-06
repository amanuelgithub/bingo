import { Agent } from '../../agents/entities/agent.entity';
import { Cashier } from '../../cashiers/entities/cashier.entity';
export declare enum UserRoleEnum {
    SUPER_ADMIN = "SUPER_ADMIN",
    AGENT = "AGENT",
    CASHIER = "CASHIER"
}
export declare enum UserStatusEnum {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
interface IUser {
    id: string;
    username: string;
    phone: string;
    email: string;
    isEmailVerified: boolean;
    role: UserRoleEnum;
    status: UserStatusEnum;
    password: string;
    createdAt: Date;
    modifiedAt: Date;
}
export declare class User implements IUser {
    id: string;
    username: string;
    phone: string;
    email: string;
    isEmailVerified: boolean;
    role: UserRoleEnum;
    status: UserStatusEnum;
    password: string;
    createdAt: Date;
    modifiedAt: Date;
    agent: Agent;
    cashier: Cashier;
}
export {};
