import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService{
    constructor(private readonly prismaService: PrismaService) { }
    async getUsers(adminId: string,  bossId: string, req: any) {
    try {
      let users;
      
      if (adminId) {
        users = await this.prismaService.user.findMany();
      } else if (bossId) {
        users = await this.prismaService.user.findMany({
          where: {
            OR: [{ id: bossId }, { bossId: bossId }],
          },
        });
      } else {
        users = await this.prismaService.user.findMany({ where: { id: req.userId } });
      }
      
      return users;
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
    }
    
    async changeUserBoss(userId: string, newBossId: string) {
    try {
      const boss = await this.prismaService.boss.findUnique({ where: { id: userId } });
      if (!boss) {
        throw new Error('Permission denied');
      }

      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: { bossId: newBossId },
      });
      
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }
}