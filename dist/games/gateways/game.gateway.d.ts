import { Server, Socket } from 'socket.io';
import { GameStateService } from '../game-state.service';
import { IGameData } from '../interface/game-data.interface';
import { GamesService } from '../games.service';
interface IGameSocketMessage {
    room: string;
    gameId: string;
    soundLang: 'am' | 'or' | string;
    soundUrl: string;
    gameData: IGameData;
}
export declare class GameGateway {
    private gameStateService;
    private gameService;
    server: Server;
    constructor(gameStateService: GameStateService, gameService: GamesService);
    handleJoinRoom(client: Socket, message: IGameSocketMessage): void;
    handleLeaveJoin(client: Socket, room: string): void;
}
export {};
