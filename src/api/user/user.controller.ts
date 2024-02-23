import { Body, Controller, Get, Param, Put, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query('userId') userId: string) {
    return await this.userService.getUsers(userId);
  }
    
  @Put(':userId/change-boss')
  async changeUserBoss(@Param('userId') userId: string, @Body('newBossId') newBossId: string) {
    return await this.userService.changeUserBoss(userId,  newBossId);
  }
}
