import { Agent } from 'src/agents/entities/agent.entity';
import { Cashier } from 'src/cashiers/entities/cashier.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRoleEnum {
  SUPER_ADMIN = 'SUPER_ADMIN',
  AGENT = 'AGENT',
  CASHIER = 'CASHIER',
}

export enum UserStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

interface IUser {
  id: string;
  username: string;
  phone: string;
  email: string;
  isEmailVerified: boolean;
  role: UserRoleEnum;
  status: UserStatusEnum;
  password: string;

  createdAt: Date;
  modifiedAt: Date;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ enum: UserRoleEnum })
  role: UserRoleEnum;

  @Column({ enum: UserStatusEnum, default: UserStatusEnum.INACTIVE })
  status: UserStatusEnum;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  // entity relationships //
  @OneToOne(() => Agent, (agent) => agent.user, { onDelete: 'CASCADE' })
  agent: Agent;

  @OneToOne(() => Cashier, (cashier) => cashier.user, { onDelete: 'CASCADE' })
  cashier: Cashier;
}
