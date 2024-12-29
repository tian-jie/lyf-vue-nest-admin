import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CardDto {
  @ApiProperty({ description: 'ID' })
  id: number;

  @ApiProperty({ description: '名称' })
  content: string;

  @ApiPropertyOptional({ description: 'user' })
  user: string;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @ApiProperty({ description: '编辑时间' })
  updateTime: Date;

}
