import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Logger } from "@nestjs/common";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(userId: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      let users;

      if (user.role === "admin" || user.role === "boss") {
        users = await this.prismaService.$queryRaw`
          WITH RECURSIVE UserHierarchy AS (
            SELECT * FROM "users" WHERE id = ${userId}
            UNION
            SELECT u.* FROM "users" u
            INNER JOIN UserHierarchy h ON u."bossId" = h.id
          )
          SELECT * FROM UserHierarchy;  
        `;
      } else {
        users = [user];
      }

      return users;
    } catch (error) {
      this.logger.error(error);
      throw new Error("Internal Server Error");
    }
  }
  async changeUserBoss(id: string, newBossId: string, userId: string) {
    const isBoss = await this.prismaService.user.findUnique({ where: { id } });

    if (!isBoss) {
      throw new ForbiddenException("Permission denied");
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
    } catch (error) {
      this.logger.error(error);
      throw new Error("Internal Server Error");
    }
  }
}
