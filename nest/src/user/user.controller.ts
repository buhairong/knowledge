import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getUserDto } from './dto/get-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  getUser(): any {
    return 'getUser';
  }

  @Get()
  getUsers(@Query() query: getUserDto): any {
    return this.userService.findAll(query);
  }

  @Post()
  addUser(@Body() dto: any): any {
    const user: Partial<User> = dto;

    return this.userService.create(user);
  }

  @Patch('/:id')
  updateUser(@Body() dto: any, @Param() id: number): any {
    const user: Partial<User> = dto;

    return this.userService.update(id, user);
  }

  @Delete('/:id')
  deleteUser(@Param() id: number): any {
    return this.userService.remove(id);
  }
}
