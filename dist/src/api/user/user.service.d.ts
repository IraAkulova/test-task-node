import { PrismaService } from '../../prisma/prisma.service';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUsers(userId: string): Promise<any>;
    changeUserBoss(userId: string, newBossId: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
        isLogedIn: boolean;
        adminId: string;
        bossId: string;
    }>;
}
