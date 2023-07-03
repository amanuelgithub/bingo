import { Game } from '../../games/entities/game.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum CardStateEnum {
  NORMAL = 'NORMAL',
  WIN = 'WIN',
}

interface IPlay {
  id: string;
  branchId: string;
  cashierId: string;
  gameId: string;
  cardId: string;
  money: number;
  cardState: CardStateEnum;
  createdAt: Date;
}

@Entity()
export class Play implements IPlay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  branchId: string;

  @Column()
  gameId: string;

  @Column()
  cardId: string;

  @Column()
  cashierId: string;

  @Column()
  money: number;

  // @Column({ enum: CardStateEnum, default: CardStateEnum.NORMAL })
  @Column()
  cardState: CardStateEnum;

  // entity relationship //
  @ManyToOne(() => Game, (game) => game.plays, { onDelete: 'CASCADE' })
  game: Game;

  @CreateDateColumn()
  createdAt: Date;
}
