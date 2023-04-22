import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PartyController } from './party.controller';
import { PartyService } from './party.service';

@Module({
  controllers: [PartyController],
  providers: [PartyService],
  imports: [PrismaModule],
})
export class PartyModule {}
