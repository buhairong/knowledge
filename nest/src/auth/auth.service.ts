import {
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { getUserDto } from 'src/user/dto/get-user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ERR_MSG_STATUS } from 'src/constants';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  async signin(username: string, password: string) {
    const user = await this.userService.find(username);
    if (!user) {
      throw new HttpException(
        ERR_MSG_STATUS[1101].msg,
        ERR_MSG_STATUS[1101].code,
      );
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new HttpException(
        ERR_MSG_STATUS[1101].msg,
        ERR_MSG_STATUS[1101].code,
      );
    }

    const token = await this.jwt.signAsync({
      username: user.username,
      sub: user.id,
    });

    return {
      token,
      id: user.id,
      nickname: user.nickname,
    };
  }

  async signup(user: Partial<User>) {
    const res = await this.userService.create(user);
    return res;
  }
}
