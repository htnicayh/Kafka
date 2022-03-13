import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly appService: AppService,
    @Inject('producer') private readonly clientKafka: ClientKafka
  ) {}

  public async onModuleInit() {
    ['kafka-topic'].forEach((key) => {
      return this.clientKafka.subscribeToResponseOf(`${key}`)
    })
    await this.clientKafka.connect()
  }

  public async onModuleDestroy() {
    await this.clientKafka.close()
  }

  @Get('kafka-test')
  public testKafka() {
    return this.clientKafka.emit('kafka-topic', {
      kafka: 'nestjs', 
      data: new Date().toString()
    })
  }

  @Get('kafka-test-response')
  public testKafkaResponse() {
    return this.clientKafka.send('kakfa-topic', {
      kafka: 'nestjs',
      date: new Date().toString()
    })
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
