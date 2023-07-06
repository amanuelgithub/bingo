import { Game } from '../../games/entities/game.entity';
export declare enum CardStateEnum {
    NORMAL = "NORMAL",
    WIN = "WIN"
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
export declare class Play implements IPlay {
    id: string;
    branchId: string;
    gameId: string;
    cardId: string;
    cashierId: string;
    money: number;
    cardState: CardStateEnum;
    game: Game;
    createdAt: Date;
}
export {};
