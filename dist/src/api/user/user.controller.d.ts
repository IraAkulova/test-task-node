import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
