import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { GameStateEnum } from '../entities/game.entity';

import { Server, Socket } from 'socket.io';
import { GameStateService } from '../game-state.service';
import { IGameData } from '../interface/game-data.interface';

// message payload interface
interface IGameSocketMessage {
  room: string; // gameId + cashierId
  gameId: string;
  gameData: IGameData;
}

@WebSocketGateway(8001, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(private gameStateService: GameStateService) {}

  // room = gameId + cashierId
  // gameId => to access gameData filename
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    client: Socket,
    message: IGameSocketMessage,
    // message: { room: string; gameState: GameStateEnum },
  ) {
    client.join(message.room);
    client.emit('joinedRoom', message.room);

    console.log('received msg: ', message);

    // message received from client
    if (message.gameData.gameState === GameStateEnum.CREATED) {
      // check if game is ended from the file
      if (
        (
          this.gameStateService.getGameStateData(
            message.gameId,
          ) as IGameSocketMessage
        ).gameData?.gameState === GameStateEnum.END
      ) {
        // todo: handle if game is already ended
        console.log('game is ended');
      } else {
        // just emit the original game data from the file -> no update
        this.server.to(message.room).emit(message.room, {
          room: message.room,
          gameId: message.gameId,
          gameData: this.gameStateService.getGameStateData(
            message.gameId,
          ) as IGameData,
        } as IGameSocketMessage);
      }
    } else {
      // first update game-data in the file
      const updatedGameData = this.gameStateService.updateGameState(
        message.gameId,
        message.gameData,
      );

      // then emit it back to client in the room
      this.server.to(message.room).emit(message.room, {
        room: message.room,
        gameId: message.gameId,
        gameData: updatedGameData,
      } as IGameSocketMessage);
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveJoin(client: Socket, room: string) {
    client.join(room);
    client.emit('leftRoom', room);
  }
}
