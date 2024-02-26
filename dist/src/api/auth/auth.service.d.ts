import { PrismaService } from "../../prisma/prisma.service";
import { AuthDto } from "../../dto/auth.dto";
export declare class AuthService {
    private readonly prismaService;
    private readonly logger;
    constructor(prismaService: PrismaService);
    registerUser(authDto: AuthDto): Promise<{
        message: string;
    }>;
    authenticateUser(authDto: AuthDto): Promise<{
        message: string;
        id: string;
        name: string;
        email: string;
    }>;
}
