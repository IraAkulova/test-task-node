import { PrismaService } from "../../prisma/prisma.service";
import { AuthDto } from "./auth.dto";
export declare class AuthService {
    private readonly prismaService;
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
