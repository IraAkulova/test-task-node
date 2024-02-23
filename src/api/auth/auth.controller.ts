import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) { }
    
@Post('register')
  async register(@Body() authDto: AuthDto): Promise<{userId: string}> {
    return await this.authService.registerUser(authDto);
  }
@Post('authenticate')
  async authenticateUser(@Body() authDto: AuthDto): Promise<void> {
    await this.authService.authenticateUser(authDto);
  }
}
