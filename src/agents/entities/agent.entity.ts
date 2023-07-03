import { Branch } from '../../branches/entities/branch.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

interface IAgent {
  id: string;
  userId: string;
  user: User;
  branches: Branch[];
}

@Entity()
export class Agent implements IAgent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  // @Column()
  // branchId: string;

  // entity relationships //
  @OneToOne(() => User, (user) => user.agent, { cascade: true })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Branch, (branch) => branch.agents)
  @JoinTable()
  branches: Branch[];
}
