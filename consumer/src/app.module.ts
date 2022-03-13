import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'consumer',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'client-consumer',
            brokers: ['localhost:29092']
          },
          consumer: {
            groupId: 'consumer-group'
          }
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
