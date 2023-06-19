import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum GameStateEnum {
  CREATED = 'CREATED',
  PAUSED = 'PAUSED',
  ACTIVE = 'ACTIVE',
  END = 'END',
}

interface IGame {
  id: string;
  branchId: string;
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
  money: number;

  @Column()
  state: GameStateEnum;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  // entity relationship //
}
