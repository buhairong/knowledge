import {
  ClassSerializerInterceptor,
  HttpException,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/role.entity';
import { In, Repository } from 'typeorm';
import { getUserDto } from './dto/get-user.dto';
import { User } from './user.entity';
import { getCurrentTime } from 'src/utils/util';
import { ERR_MSG_STATUS } from 'src/constants';
import { conditionUtils } from 'src/utils/db.helper';
import * as argon2 from 'argon2';
import { SerializeInterceptor } from 'src/interceptors/serialize/serialize.interceptor';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(query: getUserDto) {
    const { page, limit, username, role } = query;
    const take = limit || 100;
    const skip = ((page || 1) - 1) * take;

    // return this.userRepository.find({
    //   select: {
    //     id: true,
    //     username: true,
    //     nickname: true,
    //     openid: true,
    //     createTime: true,
    //     updateTime: true,
    //     lastLoginTime: true,
    //     roles: true,
    //   },
    //   relations: {
    //     roles: true,
    //   },
    //   where: {
    //     username,
    //     roles: {
    //       id: role,
    //     },
    //   },
    //   take,
    //   skip,
    // });

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role');

    const obj = {
      'user.username': username,
      'role.id': role,
    };

    const newQuery = conditionUtils(queryBuilder, obj);
    newQuery.andWhere('user.id != :id', { id: 1 });
    newQuery.orderBy('user.createTime', 'DESC');
    const total = await newQuery.getCount();
    const records = await newQuery.take(take).skip(skip).getMany();

    return {
      total,
      records,
    };
  }

  find(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id }, relations: ['roles'] });
  }

  async create(user: Partial<User>) {
    console.log('create', user);
    if (!user.roles) {
      const role = await this.roleRepository.findOne({ where: { id: 2 } });
      user.roles = [role];
    }

    if (user.roles instanceof Array && typeof user.roles[0] === 'number') {
      user.roles = await this.roleRepository.find({
        where: {
          id: In(user.roles),
        },
      });
    }

    const time = getCurrentTime();
    user.createTime = time;
    const userTmp = await this.userRepository.create(user);
    userTmp.password = await argon2.hash(userTmp.password);

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

  async updatePassword(id: number, password: string) {
    console.log('updatePassword service');
    const newPassword = await argon2.hash(password);
    const user: Partial<User> = {
      id,
      password: newPassword,
    };
    return this.userRepository.update(id, user);
  }

  async remove(id: number) {
    // return this.userRepository.delete(id);
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
