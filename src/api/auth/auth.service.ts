import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../../prisma/prisma.service";
import { AuthDto } from "./auth.dto";


@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async registerUser(authDto: AuthDto): Promise<{ message: string }> {
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
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }

  async authenticateUser(
    authDto: AuthDto
  ): Promise<{ message: string; id: string; name: string; email: string }> {
    try {
      const { email, password, role } = authDto;
      let user;

      switch (role) {
        case "user":
          user = await this.prismaService.user.findUnique({
            where: { email },
          });
          const userPasswordMatch = await bcrypt.compare(
            password,
            user.password
          );

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
          const bossPasswordMatch = await bcrypt.compare(
            password,
            user.password
          );

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
          const adminPasswordMatch = await bcrypt.compare(
            password,
            user.password
          );

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
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }
}
