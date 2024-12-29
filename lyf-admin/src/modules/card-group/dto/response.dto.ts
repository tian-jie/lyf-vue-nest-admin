import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CardDto } from 'src/modules/card/dto/response.dto';

export class CardGroupDto {
  @ApiProperty({ description: 'ID' })
  id: number;

  @ApiProperty({ description: '名称' })
  name: string;

  @ApiProperty({ description: '项目' })
  boardId: number;

  @ApiProperty({ description: '项目' })
  color: string;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @ApiProperty({ description: '编辑时间' })
  updateTime: Date;

  @ApiPropertyOptional({ description: '卡片' })
  cards?: CardDto[];

}
