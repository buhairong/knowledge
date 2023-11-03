import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/role.entity';
import { Repository } from 'typeorm';
import { getUserDto } from './dto/get-user.dto';
import { User } from './user.entity';
import { getCurrentTime } from 'src/utils/util';
import { ERR_MSG_STATUS } from 'src/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  findAll(query: getUserDto) {
    const { page, limit, username, role } = query;
    const take = limit || 100;
    const skip = ((page || 1) - 1) * take;
    return this.userRepository.find({
      select: {
        id: true,
        username: true,
        nickname: true,
        openid: true,
        createTime: true,
        updateTime: true,
        lastLoginTime: true,
        roles: true,
      },
      relations: {
        roles: true,
      },
      where: {
        username,
        roles: {
          id: role,
        },
      },
      take,
      skip,
    });
  }

  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(user: Partial<User>) {
    const time = getCurrentTime();
    user.createTime = time;
    const userTmp = await this.userRepository.create(user);

    // try {
    //   const res = await this.userRepository.save(userTmp);
    //   return res;
    // } catch (error) {
    //   if (error.errno === 1062) {
    //     throw new HttpException(ERR_MSG_STATUS[1101], 1101);
    //   }
    // }

    const res = await this.userRepository.save(userTmp);
    return res;
  }

  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
