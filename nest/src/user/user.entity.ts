import { Log } from 'src/logs/log.entity';
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
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
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

  @ManyToMany(() => Role, (role) => role.users)
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
