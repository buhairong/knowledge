import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  method: string;

  @Column()
  data: string;

  @Column()
  result: number;

  @Column()
  ip: string;

  @Column()
  project: string;

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn()
  user: User;
}
