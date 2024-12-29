import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListQueryDto {
  @ApiPropertyOptional({ description: 'Board名称' })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({ description: 'id' })
  @IsNumber()
  @IsOptional()
  id: number;
}

export class CreateBoardDto {
  @ApiProperty({ description: '名称' })
  @IsString()
  @IsNotEmpty({
    message: '名称不能为空'
  })
  readonly name: string;

}

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty({ description: 'ID' })
  @IsNumber()
  @IsNotEmpty({
    message: 'id不能为空'
  })
  id: number;
}
