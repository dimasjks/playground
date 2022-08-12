import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { delay, map, Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor(
    @Inject('REDIS_SERVICE') private readonly tcpService: ClientProxy,
  ) {}

  getHello(): Observable<string> {
    const response: Observable<string> = this.tcpService
      .send('hello', {
        msg: 'HTTP request',
      })
      .pipe(
        delay(3000),
        map((data) => data.toLowerCase()),
      );

    return response;
  }
}
