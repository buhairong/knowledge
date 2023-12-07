import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from 'src/role/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: `用户名必须在$constraint1位到$constraint2位之间`,
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: `密码必须在$constraint1位到$constraint2位之间`,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  roles?: Role[] | number[];
}
