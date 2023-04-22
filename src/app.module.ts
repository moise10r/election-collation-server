import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnitResultModule } from './unit-result/unit-result.module';
import { DayjsModule } from './dayjs/dayjs.module';
import { PrismaModule } from './prisma/prisma.module';
import { ElectionModule } from './election/election.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { EventsModule } from './events/events.module';
import { PollingUnitModule } from './polling-unit/polling-unit.module';
import { PartyModule } from './party/party.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UnitResultModule,
    DayjsModule,
    PrismaModule,
    ElectionModule,
    AwsS3Module,
    EventsModule,
    PollingUnitModule,
    PartyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
