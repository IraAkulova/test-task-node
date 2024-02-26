import { PrismaService } from "../../prisma/prisma.service";
export declare class UserService {
    private readonly prismaService;
    private readonly logger;
    constructor(prismaService: PrismaService);
    getUsers(userId: string): Promise<any>;
    changeUserBoss(id: string, newBossId: string, userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        bossId: string;
    }>;
}
