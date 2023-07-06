import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(req: any): Promise<{
        id: any;
        username: any;
        email: any;
        phone: any;
        role: any;
        status: any;
        access_token: string;
    }>;
}
