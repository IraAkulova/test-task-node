import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from "../../prisma/prisma.service";
import { Logger } from "@nestjs/common";
import { AuthDto } from "src/dto/auth.dto";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) { }
  
  async createUser(authDto: AuthDto): Promise<void> {
    const { role, ...createData } = authDto;
    const hashedPassword = await bcrypt.hash(authDto.password, 10);
    await this.prismaService.user.create({
          data: {
            ...authDto,
            password: hashedPassword,
            bossId: role === "admin" ? uuidv4() : 'ba08d59a-af06-41ef-9b1a-86a192515850',
          },
    });
    return;
  }

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
