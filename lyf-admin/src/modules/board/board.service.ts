import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/request.dto';
import { ApiException } from 'src/common/exceptions/api-exception';
import { UtilsService } from '../shared/utils.service';

@Injectable()
export class BoardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService
  ) {}

  /**
   * 通过id获取board信息
   * @param {number} id
   */
  async getById(id: number) {
    return await this.prisma.board.findFirst({
      where: {
        AND: [{ id }]
      }
    });
  }

  /**
   * 获取某个用户名下的所有项目列表
   * @param {string} name
   * @param {number} userId
   */
  async getByName(name: string, userId: number) {
    return this.prisma.board.findMany({
      where: {
        AND: [
          { name: this.utils.isEmpty(name) ? undefined : { contains: name } },
          { owner: userId }
        ]
      }
    });
  }

  /**
   * 创建Board
   */
  async create(createBoardDto: CreateBoardDto, owner: number) {
    // 不能有重名的项目
    const existBoards = await this.getByName(createBoardDto.name, owner);
    if (existBoards && existBoards.length > 0) {
      throw new ApiException('已存在同名项目。');
    }

    await this.prisma.board.create({
      data: {
        name: createBoardDto.name,
        owner: owner,
        description: createBoardDto.description
      }
    });
  }

  /**
   * 编辑Board
   */
  async update(updateDto: UpdateBoardDto) {
    const existBoard = await this.getById(updateDto.id);
    if (!existBoard) {
      throw new ApiException('不存在的项目');
    }
    // TODO: 这里不知道为什么没有更新成功
    console.log('about to update board - ' + JSON.stringify(updateDto));
    await this.prisma.board.update({
      where: { id: updateDto.id },
      data: updateDto
    });
  }
}
