import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class AppService {
  constructor(
    private readonly producerService: ProducerService
  ) {}

  async kafkaMessage() {
    await this.producerService.produce({
      topic: 'test-kafka',
      messages: [
        {
          value: 'Testing Kafka'
        }
      ]
    })

    return 'NestJS Kafka'
  }
}
