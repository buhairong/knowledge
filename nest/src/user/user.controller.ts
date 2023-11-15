import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Headers,
  HttpException,
  UnauthorizedException,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getUserDto } from './dto/get-user.dto';
import { CreateUserPipe } from './pipes/create-user/create-user.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminGuard } from 'src/guard/admin.guard';
import { JwtGuard } from 'src/guard/jwt.guard';
import { SerializeInterceptor } from '../interceptors/serialize/serialize.interceptor';
import { Serialize } from 'src/decorator/serialize.decorator';
import { ERR_MSG_STATUS } from 'src/constants';
import * as argon2 from 'argon2';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  getUser(): any {
    return 'getUser';
  }

  @Get()
  @UseGuards(AdminGuard)
  getUsers(@Query() query: getUserDto): any {
    return this.userService.findAll(query);
  }

  @Post()
  @Serialize(User)
  addUser(@Body(CreateUserPipe) dto: CreateUserDto): any {
    const user = dto as User;

    return this.userService.create(user);
  }

  @Patch('/update_password/:id')
  async updatePassword(
    @Body() dto: any,
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): Promise<any> {
    console.log('update_password');
    // 权限1：判断用户是否是自己
    // 权限2：判断用户是否有更新user的权限
    let isAdmin = false;
    const adminUser = (await this.userService.findOne(
      req.user?.userId,
    )) as User;

    if (adminUser.roles.filter((o) => o.id === 1).length) {
      isAdmin = true;
    }

    if (id === parseInt(req.user?.userId) && isAdmin) {
      // 说明是同一个用户在修改
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new HttpException(
          ERR_MSG_STATUS[1101].msg,
          ERR_MSG_STATUS[1101].code,
        );
      }

      const isPasswordValid = await argon2.verify(
        user.password,
        dto.oldPassword,
      );

      if (!isPasswordValid) {
        throw new HttpException(
          ERR_MSG_STATUS[1102].msg,
          ERR_MSG_STATUS[1102].code,
        );
      }

      const res = await this.userService.updatePassword(id, dto.newPassword);
      console.log('res', res);
      if (res.affected && res.affected === 1) {
        return {
          code: 0,
          message: '密码修改成功',
        };
      } else {
        throw new HttpException(
          ERR_MSG_STATUS[1103].msg,
          ERR_MSG_STATUS[1103].code,
        );
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  @Patch('/:id')
  updateUser(
    @Body() dto: any,
    @Param('id') id: number,
    @Headers('Authorization') headers: any,
  ): any {
    if (id === headers) {
      const user: Partial<User> = dto;

      return this.userService.update(id, user);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete('/:id')
  removeUser(@Param() id: number): any {
    return this.userService.remove(id);
  }
}
