import { Query, Controller, Get } from '@nestjs/common';
import { PollingUnitService } from './polling-unit.service';

@Controller('pollingunits')
export class PollingUnitController {
  constructor(private readonly puService: PollingUnitService) {}

  @Get()
  async getPUs(@Query('key') key: string) {
    return this.puService.fetchPollingUnits(key);
  }
}
