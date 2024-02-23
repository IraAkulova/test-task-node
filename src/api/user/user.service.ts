import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService{
    constructor(private readonly prismaService: PrismaService) { }
    async getUsers(userId: string) {
    try {
      let users;
      const user = await this.prismaService.user.findUnique({ where: { id: userId } });
      const boss = await this.prismaService.boss.findUnique({ where: { id: userId } }); 
      const admin = await this.prismaService.admin.findUnique({ where: { id: userId } }); 
      
      if (admin) {
        const bosses = await this.prismaService.boss.findMany();
        const subs = await this.prismaService.user.findMany();
        users = [...subs, ...bosses];
      } else if (boss) {
        const subs = await this.prismaService.user.findMany({ where: { bossId: userId } });
        users = [boss, ...subs]
      
      } else if(user){
        users = await this.prismaService.user.findUnique({ where: { id: userId } });
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