import { PrismaService } from '../../prisma/prisma.service';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUsers(adminId: string, bossId: string, req: any): Promise<any>;
    changeUserBoss(userId: string, newBossId: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
        adminId: string;
        bossId: string;
    }>;
}
