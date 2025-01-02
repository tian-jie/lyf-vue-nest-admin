import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  get corsOptions() {
    if (this.isDevelopment) {
      return {
        origin: process.env.CORS_ORIGIN,
        credentials: true
      };
    }
    return {
      origin: false // 生产环境禁用 CORS
    };
  }
}
