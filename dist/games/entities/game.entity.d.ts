import { Play } from '../../plays/entities/play.entity';
export declare enum GameStateEnum {
    CREATED = "CREATED",
    PAUSED = "PAUSED",
    PLAYING = "PLAYING",
    END = "END"
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
export declare class Game implements IGame {
    id: string;
    branchId: string;
    cashierId: string;
    money: number;
    state: GameStateEnum;
    startTime: Date;
    endTime: Date;
    plays: Play[];
}
export {};
