import { Module } from '@nestjs/common';
import { AmazonS3Service } from './aws-s3.service';

@Module({
  imports: [],
  providers: [AmazonS3Service],
  exports: [AmazonS3Service],
})
export class AwsS3Module {}
