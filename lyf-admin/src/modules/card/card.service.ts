import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto, UpdateCardDto } from './dto/request.dto';
import { ApiException } from 'src/common/exceptions/api-exception';
import { UtilsService } from '../shared/utils.service';
import { CardGroupService } from '../card-group/card-group.service';

@Injectable()
export class CardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
    private readonly cardGroupService: CardGroupService
  ) {}

  /**
   * 获取某个卡片组下的所有卡片列表
   * @param {number} cardGroupId
   */
  async getByGroup(cardGroupId: number) {
    await this.CheckCardGroup(cardGroupId);
    return this.prisma.card.findMany({
      where: { cardGroupId }
    });
  }

  /**
   * 获取一组卡片组下的所有卡片列表
   * @param {number[]} cardGroupIds
   */
  async getByGroups(cardGroupIds: number[]) {
    //await this.CheckCardGroup(cardGroupId);
    return this.prisma.card.findMany({
      where: { cardGroupId: { in: cardGroupIds } }
    });
  }

  /**
   * 创建Card
   */
  async create(createCardDto: CreateCardDto) {
    await this.CheckCardGroup(createCardDto.cardGroupId);
    await this.prisma.card.create({
      data: createCardDto
    });
  }

  /**
   * 编辑Card
   */
  async update(updateDto: UpdateCardDto) {
    // TODO: 这里不知道为什么没有更新成功
    console.log('about to update card - ' + JSON.stringify(updateDto));
    await this.prisma.card.update({
      where: { id: updateDto.id },
      data: updateDto
    });
  }

  async CheckCardGroup(id: number) {
    const existCard = await this.cardGroupService.getById(id);
    if (!existCard) {
      throw new ApiException('不存在的卡片组');
    }
  }

  /**
   * 删除
   */
  async delete(id: number, user: string) {
    await this.prisma.card.delete({
      where: { id, user }
    });
  }
}
