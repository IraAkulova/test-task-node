import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query('userId') userId: string) {
    return await this.userService.getUsers(userId);
  }
    
  @Put(':id/change-boss')
  async changeUserBoss(@Param('id') id: string, @Body('newBossId') newBossId: string, @Body('userId') userId: string) {
    return await this.userService.changeUserBoss(id, newBossId, userId);
  }
}
