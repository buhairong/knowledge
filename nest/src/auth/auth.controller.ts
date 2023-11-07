import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signin(@Body() dto: any) {
    const { username, password } = dto;
    return this.authService.signin(username, password);
  }

  @Post('/signup')
  signup(@Body() dto: SignupUserDto) {
    const user: Partial<User> = dto;
    return this.authService.signup(user);
  }
}
