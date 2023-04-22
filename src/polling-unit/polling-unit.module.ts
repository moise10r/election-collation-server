import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PollingUnitController } from './polling-unit.controller';
import { PollingUnitService } from './polling-unit.service';

@Module({
  imports: [PrismaModule],
  controllers: [PollingUnitController],
  providers: [PollingUnitService],
})
export class PollingUnitModule {}
