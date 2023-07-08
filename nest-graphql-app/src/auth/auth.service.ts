import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserInput } from './input/user.input';
import { UsersService } from './users/users.service';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(input: UserInput) {
    return this.usersService.createUser(input);
  }

  async login(input: UserInput) {
    const user = await this.usersService.validateUser(
      input.email,
      input.password,
    );

    // generate token data
    const tokenPayload: TokenPayload = {
      userId: user._id.toString(),
    };

    const token = this.jwtService.sign(tokenPayload);

    return { user, token };
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
