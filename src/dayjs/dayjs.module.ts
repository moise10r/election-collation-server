import { Global, Module } from '@nestjs/common';
import { DayJsService } from './dayjs.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [DayJsService],
  exports: [DayJsService],
})
export class DayjsModule {}
