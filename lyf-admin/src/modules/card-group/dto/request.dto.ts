import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCardGroupDto {
  @ApiProperty({ description: '名称' })
  @IsString()
  @IsNotEmpty({
    message: '名称不能为空'
  })
  readonly name: string;

  @ApiProperty({ description: '项目' })
  @IsNumber()
  @IsNotEmpty({
    message: '项目不能为空'
  })
  boardId: number;

  @ApiPropertyOptional({ description: '颜色' })
  @IsString()
  @IsOptional()
  color: string;
}

export class UpdateCardGroupDto extends PartialType(CreateCardGroupDto) {
  @ApiProperty({ description: 'ID' })
  @IsNumber()
  @IsNotEmpty({
    message: 'id不能为空'
  })
  id: number;
}

export class DeleteCardGroupDto {
  @ApiProperty({ description: 'ID' })
  @IsNumber()
  @IsNotEmpty({
    message: 'id不能为空'
  })
  id: number;
}
