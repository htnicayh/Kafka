import { Module } from '@nestjs/common';
import { 
  ClientsModule, 
  Transport 
} from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'producer',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'client-producer',
            brokers: ['localhost:29092']
          },
          consumer: {
            groupId: 'producer-group'
          }
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
