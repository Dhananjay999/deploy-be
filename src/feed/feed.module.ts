import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { WorkerController } from './worker/worker.controller';
import { ClientController } from './client/client.controller';

@Module({
  providers: [FeedService],
  controllers: [WorkerController, ClientController]
})
export class FeedModule {}
