import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
// import { Socket } from 'socket.io';
// import { Socket } from 'socket.io';

@WebSocketGateway(8001, {
  // cors: '*',
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
})
export class GameGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('game')
  handleMessage(@MessageBody() message: string) {
    console.log(`Received message => ${message}`);

    // Broadcast the message to all connected clients
    this.server.emit('game', [1, 2, 3, 4]);
  }
}
