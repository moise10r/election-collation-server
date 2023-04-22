import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PollingUnitService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchPollingUnits(key: string) {
    if (!key) {
      return this.prisma.state.findMany();
    }
    const keyArray = key.split('-');
    if (keyArray.length === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const [stateId, lgaId, wardId] = keyArray;
    switch (keyArray.length) {
      case 1:
        return this.prisma.state.findFirst({
          where: {
            state_id: +stateId,
          },
          include: {
            lgas: true,
          },
        });
      case 2:
        return this.prisma.lga.findFirst({
          where: {
            stateId: +stateId,
            lga_id: +lgaId,
          },
          include: {
            wards: true,
          },
        });
      case 3:
        return this.prisma.pollingUnit.findMany({
          where: {
            state: `${this.addZeroInFront(+stateId)}`,
            lga: `${this.addZeroInFront(+lgaId)}`,
            ward: `${this.addZeroInFront(+wardId)}`,
          },
        });
      default:
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  private addZeroInFront(number: number) {
    return number.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }
}
