import { IsString } from 'nestjs-swagger-dto';

export class AuthDto {

  id: string;

  @IsString({
    minLength: 2,
    maxLength: 35,
  })
  name: string;

  @IsString({pattern: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
    }})
  email: string;

  @IsString({
    minLength: 8,
    maxLength: 16,
  })
  password: string;

  @IsString({
    optional: true
  })
  role?: 'user' | 'boss' | 'admin';

 @IsString({
    optional: true
  })
 bossId?: string;
  
  @IsString({
    optional: true
  })
  adminId?: string;
}
