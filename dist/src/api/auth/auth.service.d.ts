import { PrismaService } from "../../prisma/prisma.service";
import { AuthDto } from "./auth.dto";
import { User } from "@prisma/client";
export declare class AuthService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    registerUser(authDto: AuthDto): Promise<{
        message: string;
    }>;
    authenticateUser(authDto: AuthDto): Promise<{
        message: string;
        user: User;
    }>;
}
