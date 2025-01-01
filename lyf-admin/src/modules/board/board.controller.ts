import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req
} from '@nestjs/common';
import { BoardService } from './board.service';
import {
  CreateBoardDto,
  ListQueryDto,
  UpdateBoardDto,
  DeleteBoardDto
} from './dto/request.dto';
import { Permission } from 'src/common/decorators/permission.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoardDto } from './dto/response.dto';
import { ApiResultResponse } from 'src/common/decorators/api-result-response.decorator';
import { CardService } from '../card/card.service';
import { CardGroupService } from '../card-group/card-group.service';
import { ApiException } from 'src/common/exceptions/api-exception';

@ApiTags('Board管理')
@ApiBearerAuth()
@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly cardGroupService: CardGroupService,
    private readonly cardService: CardService
  ) {}

  /**
   * 获取列表
   */
  @ApiOperation({ summary: '获取Board列表' })
  @ApiResultResponse(BoardDto, { isArray: true })
  @Get('list')
  @Permission('retroboard:owner')
  async getList(@Req() req, @Query() query: ListQueryDto): Promise<BoardDto[]> {
    const boards = await this.boardService.getByName(
      query.name,
      req.user.userId
    );
    const boardDtos = [];
    boards.forEach((p) => {
      boardDtos.push(p);
    });

    return boardDtos;
  }

  /**
   * 获取Board详细信息（带子表）
   */
  @ApiOperation({ summary: '获取Board详细信息（带子表）' })
  @ApiResultResponse(BoardDto, { isArray: false })
  @Post('getOne')
  @Permission(['retroboard:owner', 'retroboard:collaborator'])
  async getOne(@Body() query: ListQueryDto): Promise<BoardDto> {
    const board = await this.boardService.getById(query.id);
    if (!board) {
      throw new ApiException('Board不存在', 501);
    }

    const boardDto: BoardDto = board as unknown as BoardDto;
    console.log(boardDto);

    // 组装CardGroup
    const cardGroups = await this.cardGroupService.getByName(null, query.id);
    console.log(cardGroups);

    boardDto.cardGroups = cardGroups;

    // 组装Card
    const cards = await this.cardService.getByGroups(
      boardDto.cardGroups.map((cardGroup) => cardGroup.id)
    );

    // 将card分别放到Group里
    boardDto.cardGroups.forEach((cardGroup) => {
      cardGroup.cards = cards.filter(
        (card) => card.cardGroupId === cardGroup.id
      );
    });
    return boardDto;
  }

  /**
   * 创建Board
   * @param {CreateBoardDto} createBoardDto
   */
  @ApiOperation({ summary: '创建Board' })
  @ApiResultResponse()
  @Post()
  @Permission('retroboard:owner')
  async create(@Req() req, @Body() createBoardDto: CreateBoardDto) {
    await this.boardService.create(createBoardDto, req.user.userId);
  }

  /**
   * 编辑Board
   * @param {UpdateBoardDto} updateBoardDto
   */
  @ApiOperation({ summary: '编辑Board' })
  @ApiResultResponse()
  @Put()
  @Permission('retroboard:owner')
  async update(@Body() updateBoardDto: UpdateBoardDto) {
    await this.boardService.update(updateBoardDto);
  }

  /**
   * 删除Board
   * @param {UpdateBoardDto} updateBoardDto
   */
  @ApiOperation({ summary: '编辑Board' })
  @ApiResultResponse()
  @Delete()
  @Permission('retroboard:owner')
  async del(@Req() req, @Body() deleteBoardDto: DeleteBoardDto) {
    // 检查当前用户是否有权限
    await this.boardService.delete(deleteBoardDto.id, req.user.userId);
  }
}
