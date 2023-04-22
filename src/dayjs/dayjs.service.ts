import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

@Injectable()
export class DayJsService {
  constructor() {
    dayjs.extend(utc);
    dayjs.extend(timezone);

    dayjs.tz.setDefault('Africa/Lagos');
  }

  getDayJsInstance() {
    return dayjs;
  }
}
