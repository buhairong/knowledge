import { Injectable } from '@nestjs/common';
import { getUserDto } from 'src/user/dto/get-user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signin(username: string, password: string) {
    const res = await this.userService.findAll({ username } as getUserDto);
    return res;
  }

  async signup(user: Partial<User>) {
    const res = await this.userService.create(user);
    return res;
  }
}
