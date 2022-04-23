import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { S3 } from 'aws-sdk';

@Module({
  controllers: [FilesController],
  exports: [FilesService],
  providers: [
    FilesService,
    {
      provide: 'String',
      useClass: String,
    },
    {
      provide: 'S3',
      useClass: S3,
    },
  ],
})
export class FilesModule {}
