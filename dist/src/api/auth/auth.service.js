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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async registerUser(authDto) {
        const { role } = authDto;
        try {
            const hashedPassword = await bcrypt.hash(authDto.password, 10);
            switch (role) {
                case "user":
                    await this.prismaService.user.create({
                        data: {
                            ...authDto,
                            password: hashedPassword,
                        },
                    });
                    break;
                case "boss":
                    await this.prismaService.boss.create({
                        data: {
                            ...authDto,
                            password: hashedPassword,
                        },
                    });
                    break;
                case "admin":
                    await this.prismaService.admin.create({
                        data: {
                            ...authDto,
                            password: hashedPassword,
                        },
                    });
                    break;
                default:
                    throw new Error("Invalid role");
            }
            return { message: "Registration successful" };
        }
        catch (error) {
            console.error(error);
            throw new Error("Internal Server Error");
        }
    }
    async authenticateUser(authDto) {
        try {
            const { email, password, role } = authDto;
            let user;
            switch (role) {
                case "user":
                    user = await this.prismaService.user.findUnique({
                        where: { email },
                    });
                    const userPasswordMatch = await bcrypt.compare(password, user.password);
                    if (!userPasswordMatch) {
                        throw new Error("Invalid credentials");
                    }
                    await this.prismaService.user.update({
                        where: { email },
                        data: { isLogedIn: true },
                    });
                    break;
                case "boss":
                    user = await this.prismaService.boss.findUnique({
                        where: { email },
                    });
                    const bossPasswordMatch = await bcrypt.compare(password, user.password);
                    if (!bossPasswordMatch) {
                        throw new Error("Invalid credentials");
                    }
                    await this.prismaService.boss.update({
                        where: { email },
                        data: { isLogedIn: true },
                    });
                    break;
                case "admin":
                    user = await this.prismaService.admin.findUnique({
                        where: { email },
                    });
                    const adminPasswordMatch = await bcrypt.compare(password, user.password);
                    if (!adminPasswordMatch) {
                        throw new Error("Invalid credentials");
                    }
                    await this.prismaService.admin.update({
                        where: { email },
                        data: { isLogedIn: true },
                    });
                    break;
                default:
                    throw new Error("Invalid role");
            }
            if (!user) {
                throw new Error("Invalid credentials");
            }
            const { id, name } = user;
            return { message: "Authentication successful", id, name, email };
        }
        catch (error) {
            console.error(error);
            throw new Error("Internal Server Error");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map