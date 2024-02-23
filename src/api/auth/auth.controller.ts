import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) { }
    
@Post('register')
async register(@Body() authDto: AuthDto): Promise<{message: string}> {
    return await this.authService.registerUser(authDto);
  }
@Post('authenticate')
  async authenticateUser(@Body() authDto: AuthDto): Promise<{ message: string, id: string, name: string, email: string }> {
    return await this.authService.authenticateUser(authDto);
  }
}
