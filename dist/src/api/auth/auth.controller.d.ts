import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(authDto: AuthDto): Promise<{
        message: string;
    }>;
    authenticateUser(authDto: AuthDto): Promise<{
        message: string;
        user: User;
    }>;
}
