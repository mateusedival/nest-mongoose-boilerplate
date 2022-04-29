import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  async uploadFile({ buffer, key }: { buffer: Buffer; key: string }) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get<string>('S3_BUCKET_NAME'),
        Body: buffer,
        Key: `${uuid()}-${key}`,
      })
      .promise();

    if (uploadResult.Location) {
      return uploadResult;
    }

    throw new HttpException('Could not upload image', 400);
  }

  async deleteFile(key: string) {
    const s3 = new S3();
    s3.deleteObject({
      Bucket: this.configService.get<string>('S3_BUCKET_NAME'),
      Key: key,
    }).promise();
  }
}
