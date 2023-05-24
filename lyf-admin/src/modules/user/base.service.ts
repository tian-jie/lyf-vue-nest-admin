import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { User } from '@prisma/client';

@Injectable()
export class BaseService {
  constructor(private readonly authService: AuthService) {}

  /**
   * 登录
   * @param {User} user
   */
  async login(user: User) {
    const payload = { userId: user.id };
    return this.authService.generateToken(payload);
  }
  /**
   * 登出
   * @param {string} token
   */
  async logout(token: string) {
    return this.authService.removeToken(token);
  }
}