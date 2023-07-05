import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { GameStateEnum } from '../entities/game.entity';

import { Server, Socket } from 'socket.io';
import { GameStateService } from '../game-state.service';
import { IGameData } from '../interface/game-data.interface';
import { GamesService } from '../games.service';

// message payload interface
interface IGameSocketMessage {
  room: string; // gameId + cashierId
  gameId: string; // gameId.json
  soundLang: 'am' | 'or' | string;
  soundUrl: string;
  gameData: IGameData;
}

@WebSocketGateway(8001, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private gameStateService: GameStateService,
    private gameService: GamesService,
  ) {}

  // room = gameId + cashierId
  // gameId => to access gameData filename
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, message: IGameSocketMessage) {
    client.join(message.room);
    client.emit('joinedRoom', message.room);

    if (message.gameData.gameState === GameStateEnum.CREATED) {
      // just emit the original game data from the file -> no update
      this.server.to(message.room).emit(message.room, {
        room: message.room,
        gameId: message.gameId,
        gameData: this.gameStateService.getGameStateData(
          message.gameId,
        ) as IGameData,
      } as IGameSocketMessage);
    } else {
      // update the game state in the game db tables
      this.gameService.updateGameState(
        message.gameId.split('.')[0],
        message.gameData.gameState,
      );

      // first update game-data in the file
      const updatedGameData = this.gameStateService.updateGameState(
        message.gameId,
        message.gameData,
      );

      let soundUrl = '';
      if (message.soundLang === 'am') {
        soundUrl = `http://localhost:3001/api/games/balls-audio/am/${
          message.gameData.playingNumbers[message.gameData.currentIndex]
        }amh.m4a`;
      } else if (message.soundLang === 'or') {
        soundUrl = `http://localhost:3001/api/games/balls-audio/or/${
          message.gameData.playingNumbers[message.gameData.currentIndex]
        }or.m4a`;
      }

      // else {
      //   soundUrl = `http://localhost:3001/api/games/balls-audio/${
      //     message.gameData.playingNumbers[message.gameData.currentIndex]
      //   }amh.m4a`;
      // }

      // then emit it back to client in the room
      this.server.to(message.room).emit(message.room, {
        room: message.room,
        gameId: message.gameId,
        soundLang: message.soundLang,
        soundUrl: soundUrl,
        gameData: updatedGameData,
      } as IGameSocketMessage);
      // }
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveJoin(client: Socket, room: string) {
    client.join(room);
    client.emit('leftRoom', room);
  }
}
