import { Module } from '@nestjs/common';
import { WorkerService } from './worker/worker.service';
import { ClientService } from './client/client.service';
import { ClientController } from './client/client.controller';
import { WorkerController } from './worker/worker.controller';

@Module({
  providers: [WorkerService, ClientService],
  controllers: [ClientController, WorkerController],
})
export class ProfileModule {}
