import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(user: any): Promise<{
        id: any;
        username: any;
        email: any;
        phone: any;
        role: any;
        status: any;
        access_token: string;
    }>;
    validateUser(email: string, pass: string): Promise<any>;
}
