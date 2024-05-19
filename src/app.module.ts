import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [ProfileModule, FeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
