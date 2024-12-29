import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardGroupDto, UpdateCardGroupDto } from './dto/request.dto';
import { ApiException } from 'src/common/exceptions/api-exception';
import { UtilsService } from '../shared/utils.service';

@Injectable()
export class CardGroupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) { }

  /**
   * 通过id获取cardGroup信息
   * @param {number} id
   */
  async getById(id: number) {
    return await this.prisma.cardGroup.findFirst({
      where: {
        AND: [{ id }]
      }
    });
  }

  /**
   * 获取某个用户名下的所有卡片组列表
   * @param {string} name
   * @param {number} boardId
   * @param {string} color
   */
  async getByName(name: string, boardId: number) {
    return this.prisma.cardGroup.findMany({
      where: {
        AND: [{ name: this.utils.isEmpty(name) ? undefined : { contains: name } }, { boardId }]
      }
    });
  }

  /**
   * 创建CardGroup
   */
  async create(createCardGroupDto: CreateCardGroupDto) {
    // 不能有重名的卡片组
    const existCardGroups = await this.getByName(
      createCardGroupDto.name,
      createCardGroupDto.boardId,
    );
    if (existCardGroups && existCardGroups.length > 0) {
      throw new ApiException('已存在同名卡片组。');
    }

    await this.prisma.cardGroup.create({
      data: createCardGroupDto
    });
  }

  /**
   * 编辑CardGroup
   */
  async update(updateDto: UpdateCardGroupDto) {
    const existCardGroup = await this.getById(updateDto.id);
    if (!existCardGroup) {
      throw new ApiException('不存在的卡片组');
    }
    // TODO: 这里不知道为什么没有更新成功
    console.log('about to update cardGroup - ' + JSON.stringify(updateDto))
    this.prisma.cardGroup.update({
      where: { id: updateDto.id },
      data: updateDto
    });
  }
}
