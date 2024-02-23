import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
