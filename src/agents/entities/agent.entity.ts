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

interface IAgent {
  id: string;
  userId: string;
  branchId: string;
  user: User;
  branch: Branch;
}

@Entity()
export class Agent implements IAgent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  branchId: string;

  // entity relationships //
  @OneToOne(() => User, (user) => user.agent, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Branch, (branch) => branch.agents)
  branch: Branch;
}
