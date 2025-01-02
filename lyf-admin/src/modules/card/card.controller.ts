import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto, UpdateCardDto, DeleteCardDto } from './dto/request.dto';
import { Permission } from 'src/common/decorators/permission.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardDto } from './dto/response.dto';
import { ApiResultResponse } from 'src/common/decorators/api-result-response.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('卡片管理')
@ApiBearerAuth()
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  /**
   * 获取部门列表
   */
  @ApiOperation({ summary: '获取卡片列表' })
  @ApiResultResponse(CardDto, { isArray: true })
  @Get('list')
  @Permission('system:card:query')
  async getList(groupId: number): Promise<CardDto[]> {
    const cards = await this.cardService.getByGroup(groupId);
    const cardDtos = [];
    cards.forEach((p) => {
      cardDtos.push(p);
    });

    return cardDtos;
  }

  /**
   * 创建卡片
   * @param {CreateCardDto} createCardDto
   */
  @ApiOperation({ summary: '创建卡片' })
  @ApiResultResponse()
  @Post()
  @Public()
  async create(@Req() req, @Body() createCardDto: CreateCardDto) {
    // createCardDto.user = req.user.userId.toString();
    await this.cardService.create(createCardDto);
  }

  /**
   * 编辑卡片
   * @param {UpdateCardDto} updateCardDto
   */
  @ApiOperation({ summary: '编辑卡片' })
  @ApiResultResponse()
  @Put()
  @Public()
  async update(@Req() req, @Body() updateCardDto: UpdateCardDto) {
    await this.cardService.update(updateCardDto);
  }

  /**
   * 编辑卡片
   * @param {DeleteCardDto} deleteCardDto
   */
  @ApiOperation({ summary: '删除卡片' })
  @ApiResultResponse()
  @Put()
  @Permission('retroboard:card:delete')
  async delete(@Req() req, @Body() deleteCardDto: DeleteCardDto) {
    await this.cardService.delete(deleteCardDto.id, req.user.userId);
  }
}
