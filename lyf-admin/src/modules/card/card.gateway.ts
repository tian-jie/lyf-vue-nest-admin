import { LoggerService } from '../shared/logger.service';
import { ConfigService } from '@nestjs/config';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:1995', // 前端地址
    credentials: true // 允许跨域携带 Cookie 或认证信息
  },
  transport: ['websocket'] // 强制使用 WebSocket
})
export class CardGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService
  ) {}

  @WebSocketServer()
  server: Server;

  // afterInit(server: Server) {
  //   // 动态获取 CORS 配置
  //   const origin = this.configService.get<string>(
  //     'CORS_ORIGIN',
  //     process.env.CORS_ORIGIN
  //   );
  //   const credentials = this.configService.get<boolean>(
  //     'CORS_CREDENTIALS',
  //     true
  //   );

  //   // 动态配置 CORS
  //   server.engine.opts = {
  //     ...server.engine.opts,
  //     allowRequest: (req, callback) => {
  //       const isAllowedOrigin = req.headers.origin === origin;
  //       callback(
  //         null,
  //         isAllowedOrigin && credentials // 允许符合条件的请求
  //       );
  //     }
  //   };

  //   this.logger.log(
  //     `CORS configured: origin=${origin}, credentials=${credentials}`
  //   );
  // }

  handleConnection(client: any) {
    this.logger.log('Client connected:' + client.id);
  }

  handleDisconnect(client: any) {
    this.logger.log('Client disconnected:' + client.id);
  }

  sendCardUpdate(card: any) {
    this.server.emit('cardUpdated', card);
  }
}
