"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getUsers(userId) {
        try {
            let users;
            const user = await this.prismaService.user.findUnique({ where: { id: userId } });
            const boss = await this.prismaService.boss.findUnique({ where: { id: userId } });
            const admin = await this.prismaService.admin.findUnique({ where: { id: userId } });
            if (admin) {
                const bosses = await this.prismaService.boss.findMany();
                const subs = await this.prismaService.user.findMany();
                users = [...subs, ...bosses];
            }
            else if (boss) {
                const subs = await this.prismaService.user.findMany({ where: { bossId: userId } });
                users = [boss, ...subs];
            }
            else if (user) {
                users = await this.prismaService.user.findUnique({ where: { id: userId } });
            }
            return users;
        }
        catch (error) {
            console.error(error);
            throw new Error('Internal Server Error');
        }
    }
    async changeUserBoss(id, newBossId, userId) {
        const isBoss = await this.prismaService.boss.findUnique({ where: { id } });
        if (!isBoss) {
            throw new Error('Permission denied');
        }
        try {
            console.log(newBossId);
            const updatedUser = await this.prismaService.user.update({
                where: { id: userId },
                data: { bossId: newBossId },
            });
            return updatedUser;
        }
        catch (error) {
            console.error(error);
            throw new Error('Internal Server Error');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map