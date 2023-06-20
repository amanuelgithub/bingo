import { Branch } from 'src/branches/entities/branch.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

interface ICashier {
  id: string;
  userId: string;
  branchId: string;
  user: User;
  branch: Branch;

  // question
  // clearTime: any;
}

@Entity()
export class Cashier implements ICashier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  branchId: string;

  // entity relationships //
  @OneToOne(() => User, (user) => user.cashier, { cascade: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Branch, (branch) => branch.cashiers)
  branch: Branch;
}