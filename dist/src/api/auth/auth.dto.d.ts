export declare class AuthDto {
    id: string;
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'boss' | 'admin';
    bossId?: string;
    adminId?: string;
}
