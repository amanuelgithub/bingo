import { Play } from 'src/plays/entities/play.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum GameStateEnum {
  CREATED = 'CREATED',
  PAUSED = 'PAUSED',
  PLAYING = 'PLAYING',
  END = 'END',
}

interface IGame {
  id: string;
  branchId: string;
  cashierId: string;
  money: number;
  state: GameStateEnum;
  startTime: Date;
  endTime: Date;
}

@Entity()
export class Game implements IGame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  branchId: string;

  @Column()
  cashierId: string;

  @Column()
  money: number;

  @Column()
  state: GameStateEnum;

  @Column({ nullable: true })
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  // entity relationship //
  @OneToMany(() => Play, (play) => play.game)
  plays: Play[];
}
