import { IsString, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @IsString()
  @ApiProperty({
    example: '6216e93be43b2e9aedb76504',
    required: true,
  })
  _id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'https://aws.bucket/filename.mp3' })
  url: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'filename.mp3' })
  key: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'audio/mp3' })
  mimetype: string;
}

export default FileDto;
