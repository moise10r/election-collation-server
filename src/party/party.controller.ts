import { Controller, Get, Param } from '@nestjs/common';
import { PartyService } from './party.service';

@Controller('parties')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Get(':electionId')
  getElectionParties(@Param() params) {
    return this.partyService.getElectionParties(params.electionId);
  }
}
