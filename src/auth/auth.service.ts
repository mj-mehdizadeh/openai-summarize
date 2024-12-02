import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, firstName, lastName, password } = registerDto;

    const user = await this.userService.findUserBy({
      username,
    });

    if (user) {
      throw new BadRequestException('User with this phoneNumber exists');
    }

    await this.userService.registerUser({
      username,
      firstName,
      lastName,
      passwordHash: await bcrypt.hash(password, 10),
    });
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findUserBy({
      username,
    });
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity) {
    return this.signToken(user);
  }

  async signToken(user: UserEntity) {
    return {
      access_token: await this.generateAccessToken(user),
    };
  }

  async generateAccessToken(user: UserEntity) {
    return await this.jwtService.signAsync({
      _: 'access',
      sub: user.id,
      username: user.username,
    });
  }
}
