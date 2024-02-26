import { AuthDto } from '../../dto/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(authDto: AuthDto): Promise<{
        message: string;
    }>;
    authenticateUser(authDto: AuthDto): Promise<{
        message: string;
        id: string;
        name: string;
        email: string;
    }>;
}
