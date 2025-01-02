import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListQueryDto {
  @ApiPropertyOptional({ description: '名称' })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ description: '分组Id' })
  @IsNumber()
  @IsNotEmpty({
    message: '分组不能为空'
  })
  readonly groupId: number;
}

export class CreateCardDto {
  @ApiProperty({ description: '内容' })
  @IsString()
  @IsNotEmpty({
    message: '内容不能为空'
  })
  readonly content: string;

  @ApiProperty({ description: '分组Id' })
  @IsNumber()
  @IsNotEmpty({
    message: '分组不能为空'
  })
  readonly cardGroupId: number;

  @ApiProperty({ description: '用户' })
  @IsString()
  @IsNotEmpty({
    message: '用户不能为空'
  })
  user: string;
}

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @ApiProperty({ description: 'ID' })
  @IsNumber()
  @IsNotEmpty({
    message: 'id不能为空'
  })
  id: number;
}

export class DeleteCardDto {
  @ApiProperty({ description: 'ID' })
  @IsNumber()
  @IsNotEmpty({
    message: 'id不能为空'
  })
  id: number;
}
