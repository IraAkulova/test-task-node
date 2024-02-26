import { Injectable, Logger } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../../prisma/prisma.service";
import { AuthDto } from "../../dto/auth.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(UserService.name);
  
  constructor(private readonly prismaService: PrismaService,
  private readonly userService: UserService) { }
  
  async registerUser(authDto: AuthDto): Promise<{ message: string }> {
    try {
       await this.userService.createUser(authDto);
      return { message: "Registration successful" };
    } catch (error) {
      this.logger.error(error);
      throw new Error("Internal Server Error");
    }
  }

  async authenticateUser(
    authDto: AuthDto
  ): Promise<{ message: string; id: string; name: string; email: string }> {
    try {
      const { email, password} = authDto;

      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      const userPasswordMatch = await bcrypt.compare(password, user.password);

      if (!userPasswordMatch) {
        throw new Error("Invalid credentials");
      }
      await this.prismaService.user.update({
        where: { email },
        data: { isLogedIn: true },
      });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const { id, name } = user;

      return { message: "Authentication successful", id, name, email };
    } catch (error) {
      this.logger.error(error);
      throw new Error("Internal Server Error");
    }
  }
}
