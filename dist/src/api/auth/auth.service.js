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
const uuid_1 = require("uuid");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(prismaService) {
        this.prismaService = prismaService;
        this.logger = new common_1.Logger(user_service_1.UserService.name);
    }
    async registerUser(authDto) {
        const { role } = authDto;
        try {
            const hashedPassword = await bcrypt.hash(authDto.password, 10);
            if (role === "admin") {
                await this.prismaService.user.create({
                    data: {
                        ...authDto,
                        password: hashedPassword,
                        bossId: (0, uuid_1.v4)(),
                    },
                });
            }
            else if (role === "boss") {
                await this.prismaService.user.create({
                    data: {
                        ...authDto,
                        password: hashedPassword,
                        bossId: 'ba08d59a-af06-41ef-9b1a-86a192515850',
                    },
                });
            }
            else {
                await this.prismaService.user.create({
                    data: {
                        ...authDto,
                        password: hashedPassword,
                        bossId: 'ba08d59a-af06-41ef-9b1a-86a192515850',
                    },
                });
            }
            return { message: "Registration successful" };
        }
        catch (error) {
            this.logger.error(error);
            throw new Error("Internal Server Error");
        }
    }
    async authenticateUser(authDto) {
        try {
            const { email, password } = authDto;
            const user = await this.prismaService.user.findUnique({
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
            if (!user) {
                throw new Error("Invalid credentials");
            }
            const { id, name } = user;
            return { message: "Authentication successful", id, name, email };
        }
        catch (error) {
            this.logger.error(error);
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