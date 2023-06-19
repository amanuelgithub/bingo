import { Agent } from 'src/agents/entities/agent.entity';
import { Cashier } from 'src/cashiers/entities/cashier.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

interface IBranch {
  id: string;
  name: string;
  // question
  // flat: any;
  // boughtTickets: any;
  agents: Agent[];
  cashiers: Cashier[];

  createdAt: Date;
  modifiedAt: Date;
}

@Entity()
export class Branch implements IBranch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  // entity relationships //
  @OneToMany(() => Agent, (agent) => agent.branch)
  agents: Agent[];

  @OneToMany(() => Cashier, (cashier) => cashier.branch)
  cashiers: Cashier[];
}
