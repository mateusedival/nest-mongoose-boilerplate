import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('String') private readonly bucket: string,
    @Inject('S3') private readonly s3: S3,
  ) {
    bucket = this.configService.get('S3_BUCKET_NAME');
    s3 = new S3();
  }

  async uploadFile({ buffer, key }: { buffer: Buffer; key: string }) {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.bucket,
        Body: buffer,
        Key: key,
      })
      .promise();
    console.log('Upload:', uploadResult);
    if (uploadResult.Location) {
      return uploadResult;
    }

    throw new HttpException('Could not upload image', 400);
  }

  async deleteFile(key: string) {
    const deletedObject = await this.s3
      .deleteObject({ Bucket: this.bucket, Key: key })
      .promise();

    console.log(deletedObject);
  }
}
