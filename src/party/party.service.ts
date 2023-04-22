import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PartyService {
  constructor(private readonly prisma: PrismaService) {}

  async getElectionParties(electionId: string) {
    return this.prisma.election.findFirst({
      where: {
        id: electionId,
      },
      select: {
        politicalParties: {
          select: {
            politicalParty: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
