import { Injectable } from '@nestjs/common';
import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidV4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AmazonS3Service {
  amazonS3Client: any;
  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    this.amazonS3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  private getObjectKey(path: string): string {
    const pathArray = path.split('/');
    const key =
      pathArray[pathArray.length - 2] + '/' + pathArray[pathArray.length - 1];
    return key;
  }

  async deleteFromAws(objPath: string): Promise<any> {
    const objKey = this.getObjectKey(objPath);
    const command = new DeleteObjectCommand({
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: objKey,
    });

    const response = await this.amazonS3Client.send(command);
    return response;
  }

  async uploadFile(
    dataBuffer: Buffer,
    fileType: string,
    location: string,
  ): Promise<any> {
    const fileKey = location + uuidV4() + '.' + fileType.split('/')[1];

    const command = new PutObjectCommand({
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: fileKey,
      Body: dataBuffer,
      ACL: 'public-read',
    });

    const response = await this.amazonS3Client.send(command);
    if (response.$metadata.httpStatusCode === 200) {
      return fileKey;
    }
  }
}
