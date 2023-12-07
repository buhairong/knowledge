import { Exclude, Expose } from 'class-transformer';
import { Log } from 'src/log/log.entity';
import { Role } from 'src/role/role.entity';
import {
  AfterInsert,
  AfterRemove,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: null })
  nickname: string;

  @Column({ default: null })
  openid: string;

  @Column()
  createTime: string;

  @Column({ default: null })
  updateTime: string;

  @Column({ default: null })
  lastLoginTime: string;

  @Column({ default: 1 })
  valid: number;

  @OneToMany(() => Log, (log) => log.user)
  logs: Log[];

  @ManyToMany(() => Role, (role) => role.users, { cascade: ['insert'] })
  @JoinTable({ name: 'users_roles' })
  roles: Role[];

  @AfterInsert()
  afterInsert() {
    console.log('afterInsert', this.id);
  }

  @AfterRemove()
  afterRemove() {
    console.log('afterRemove');
  }
}
