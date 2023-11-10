import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() dto: any) {
    console.log('signin1');
    const { username, password } = dto;
    const token = await this.authService.signin(username, password);
    return {
      code: 0,
      access_token: token,
    };
  }

  @Post('/signup')
  signup(@Body() dto: SignupUserDto) {
    const user: Partial<User> = dto;
    return this.authService.signup(user);
  }
}
