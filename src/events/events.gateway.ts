import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: new ConfigService().get<string>('APP_FRONTEND_URL'),
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): WsResponse<unknown> {
    const event = 'events';
    return { event, data };
  }
}
