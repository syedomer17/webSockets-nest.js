import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users = new Map<string, string>(); // socketId -> username

  handleConnection(client: Socket) {
    console.log('New user connected...', client.id);
  }

  handleDisconnect(client: Socket) {
    const username = this.users.get(client.id) || client.id;
    this.users.delete(client.id);

    console.log(`${username} left the chat`);

    this.server.emit('user-left', {
      message: `${username} has left the chat`,
    });
  }

  @SubscribeMessage('setUsername')
  handleSetUsername(client: Socket, username: string) {
    this.users.set(client.id, username);
    console.log(`${username} joined the chat`);

    client.broadcast.emit('user-joined', {
      message: `${username} has joined the chat`,
    });
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(client: Socket, payload: { message: string; username: string }) {
    this.server.emit('message', payload); // Broadcast to all
  }
}
