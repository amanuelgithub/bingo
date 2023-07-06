import { GameCreatedEvent } from './events/game-created.event';
import { IGameData } from './interface/game-data.interface';
export declare class GameStateService {
    private readonly BASE_DIRECTORY_NAME;
    createGameJSONfile(payload: GameCreatedEvent): void;
    initializeGameData(): IGameData;
    createDirectory(): void;
    searchFileInDirectory(directoryPath: any, fileNameWithoutExtension: any): Promise<unknown>;
    generatePlayNumbers(): number[];
    shuffleArray<T>(array: T[]): T[];
    getGameStateData(filename: string): IGameData;
    updateGameState(filename: string, newGameData: IGameData): IGameData;
}
