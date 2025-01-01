import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { CardGroupService } from './card-group.service';
import {
  CreateCardGroupDto,
  DeleteCardGroupDto,
  UpdateCardGroupDto
} from './dto/request.dto';
import { Permission } from 'src/common/decorators/permission.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardGroupDto } from './dto/response.dto';
import { ApiResultResponse } from 'src/common/decorators/api-result-response.decorator';
import { BoardService } from '../board/board.service';
import { ApiException } from 'src/common/exceptions/api-exception';

@ApiTags('卡片组管理')
@ApiBearerAuth()
@Controller('cardGroup')
export class CardGroupController {
  constructor(
    private readonly cardGroupService: CardGroupService,
    private readonly boardService: BoardService
  ) {}

  /**
   * 获取部门列表
   */
  @ApiOperation({ summary: '获取卡片组列表' })
  @ApiResultResponse(CardGroupDto, { isArray: true })
  @Get('list')
  @Permission('system:cardGroup:query')
  async getList(boardId: number): Promise<CardGroupDto[]> {
    const cardGroups = await this.cardGroupService.getByName(null, boardId);
    const cardGroupDtos = [];
    cardGroups.forEach((p) => {
      cardGroupDtos.push(p);
    });

    return cardGroupDtos;
  }

  /**
   * 创建卡片组
   * @param {CreateCardGroupDto} createCardGroupDto
   */
  @ApiOperation({ summary: '创建卡片组' })
  @ApiResultResponse()
  @Post()
  @Permission('retroboard:cardGroup:add')
  async create(@Req() req, @Body() createCardGroupDto: CreateCardGroupDto) {
    await this.cardGroupService.create(createCardGroupDto, req.user.userId);
  }

  /**
   * 编辑卡片组
   * @param {UpdateCardGroupDto} updateCardGroupDto
   */
  @ApiOperation({ summary: '编辑卡片组' })
  @ApiResultResponse()
  @Put()
  @Permission('retroboard:cardGroup:edit')
  async update(@Body() updateCardGroupDto: UpdateCardGroupDto) {
    await this.cardGroupService.update(updateCardGroupDto);
  }

  /**
   * 删除卡片组 （真删）
   * @param {DeleteCardGroupDto} deleteCardGroupDto
   */
  @ApiOperation({ summary: '编辑卡片组' })
  @ApiResultResponse()
  @Delete()
  @Permission('retroboard:cardGroup:delete')
  async del(@Req() req, @Body() deleteCardGroupDto: DeleteCardGroupDto) {
    await this.cardGroupService.delete(deleteCardGroupDto.id, req.user.userId);
  }
}
