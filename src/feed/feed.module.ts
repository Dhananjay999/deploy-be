import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { WorkerController } from './worker/worker.controller';
import { ClientController } from './client/client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedData, FeedDataSchema } from './db/feed.schema';
import { IdGeneratorService } from 'src/services/id-generator/id-generator.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeedData.name, schema: FeedDataSchema },
    ]),
  ],
  providers: [FeedService, IdGeneratorService],
  controllers: [WorkerController, ClientController],
})
export class FeedModule {}
