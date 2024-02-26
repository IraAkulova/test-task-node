import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(userId: string): Promise<any>;
    changeUserBoss(id: string, newBossId: string, userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        bossId: string;
    }>;
}
