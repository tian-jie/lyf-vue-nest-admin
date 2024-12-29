import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CardGroup } from '@prisma/client';
import { CardGroupDto } from 'src/modules/card-group/dto/response.dto';

export class BoardDto {
  @ApiProperty({ description: 'ID' })
  id: number;

  @ApiProperty({ description: '名称' })
  name: string;

  @ApiProperty({ description: 'owner' })
  owner: number;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @ApiProperty({ description: '编辑时间' })
  updateTime: Date;

  @ApiPropertyOptional({ description: '卡片组'})
  cardGroups?: CardGroupDto[];

  @ApiProperty({ description: '逻辑删除' })
  isDeleted: Boolean;
}
