import { GameStateEnum } from '../entities/game.entity';

export interface IGameData {
  gameState: GameStateEnum;
  currentIndex: number;
  playingNumbers: number[];
}
