import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/user/user.service';
import { User } from '../entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string) {
    console.log({ userName, password });
    const user = await this.userService.findOne(userName);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.userName,
      sub: { name: user.name, email: user.email, role: user.role },
    };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
