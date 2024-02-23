import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { APP_PIPE } from "@nestjs/core";
import { UserModule } from './api/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      }),
    },
  ],
})
export class AppModule {}
