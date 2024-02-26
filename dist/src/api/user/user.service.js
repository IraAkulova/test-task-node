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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const common_2 = require("@nestjs/common");
let UserService = UserService_1 = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
        this.logger = new common_2.Logger(UserService_1.name);
    }
    async getUsers(userId) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            let users;
            if (user.role === "admin" || user.role === "boss") {
                users = await this.prismaService.$queryRaw `
          WITH RECURSIVE UserHierarchy AS (
            SELECT * FROM "users" WHERE id = ${userId}
            UNION
            SELECT u.* FROM "users" u
            INNER JOIN UserHierarchy h ON u."bossId" = h.id
          )
          SELECT * FROM UserHierarchy;  
        `;
            }
            else {
                users = [user];
            }
            return users;
        }
        catch (error) {
            this.logger.error(error);
            throw new Error("Internal Server Error");
        }
    }
    async changeUserBoss(id, newBossId, userId) {
        const isBoss = await this.prismaService.user.findUnique({ where: { id } });
        if (!isBoss) {
            throw new common_1.ForbiddenException("Permission denied");
        }
        try {
            const updatedUser = await this.prismaService.user.update({
                where: { id: userId },
                data: { bossId: newBossId },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    bossId: true,
                },
            });
            return updatedUser;
        }
        catch (error) {
            this.logger.error(error);
            throw new Error("Internal Server Error");
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map