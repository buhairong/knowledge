import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getUserDto } from 'src/user/dto/get-user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  async signin(username: string, password: string) {
    const user = await this.userService.find(username);

    if (user && user.password === password) {
      return this.jwt.signAsync({
        username: user.username,
        sub: user.id,
      });
    }

    throw new UnauthorizedException();
  }

  async signup(user: Partial<User>) {
    const res = await this.userService.create(user);
    return res;
  }
}
