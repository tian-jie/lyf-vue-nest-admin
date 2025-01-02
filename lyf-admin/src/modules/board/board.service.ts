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
        AND: [{ id }, { isDelete: false }]
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
          { name: this.utils.isEmpty(name) ? undefined : { equals: name } },
          { owner: userId },
          { isDelete: false }
        ]
      }
    });
  }

  /**
   * 获取某个用户名下的所有项目列表
   * @param {string} name
   * @param {number} userId
   */
  async filterByName(name: string, userId: number) {
    return this.prisma.board.findMany({
      where: {
        AND: [
          { name: this.utils.isEmpty(name) ? undefined : { contains: name } },
          { owner: userId },
          { isDelete: false }
        ]
      }
    });
  }

  /**
   * 创建Board
   * @param createBoardDto
   * @param owner
   */
  async create(createBoardDto: CreateBoardDto, owner: number) {
    // 不能有重名的项目
    const existBoards = await this.getByName(createBoardDto.name, owner);
    console.error(existBoards);
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
   * @param updateDto
   */
  async update(updateDto: UpdateBoardDto) {
    const existBoard = await this.getById(updateDto.id);
    if (!existBoard) {
      throw new ApiException('不存在的项目');
    }

    await this.prisma.board.update({
      where: { id: updateDto.id },
      data: updateDto
    });
  }

  /**
   * 删除Board
   * @param id
   * @param userId
   */
  async delete(id: number, userId: number) {
    await this.prisma.board.update({
      where: { id, owner: userId },
      data: {
        isDelete: true
      }
    });
  }
}
