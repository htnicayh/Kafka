import { Controller, Get } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { Logger } from 'kafkajs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger
  ) {}

  @MessagePattern('kafka-topic')
  public receiveMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage()
    const response = 
      `Receiving a new message from topic: kafka-topic: ` + 
      JSON.stringify(originalMessage.value)
    
    // this.logger.info('Response ', { response })

    console.log('Payload Message ', message)
    console.log('Receiving response ', response)
    return response
  }

  @Get()
  public getHello(): string {
    return this.appService.getHello()
  }
}
