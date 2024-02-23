import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { APP_PIPE } from "@nestjs/core";

@Module({
  imports: [AuthModule],
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
