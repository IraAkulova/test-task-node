import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDto } from "./auth.dto";

@Injectable()
export class AuthService{
    constructor(private readonly prismaService: PrismaService) { }
      async registerUser(authDto: AuthDto) {
    try {
      const { email, password, name, bossId, adminId } = authDto;
      
      const userRole = adminId ? 'Admin' : bossId ? 'Boss' : 'User';
      
      const createdUser = await this.prismaService[userRole].create({
        data: { email, password, name, bossId, adminId },
      });
      
      return createdUser;
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
      }
    
    async authenticateUser(authDto: AuthDto) {
    try {
      const { email, password } = authDto;
      
      const user = await this.prismaService.user.findUnique({
        where: { email, password },
      });
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      return { message: 'Authentication successful', user };
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }
}