import { Agent } from '../../agents/entities/agent.entity';
import { Cashier } from '../../cashiers/entities/cashier.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  // house edge configuration
  @Column({ nullable: false, default: 10 })
  houseEdge: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  // entity relationships //
  @ManyToMany(() => Agent, (agent) => agent.branches)
  agents: Agent[];

  @OneToMany(() => Cashier, (cashier) => cashier.branch)
  cashiers: Cashier[];
}
