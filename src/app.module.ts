import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { FeedModule } from './feed/feed.module';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dhananjaymanjare:zl8aoeIHs49j2Zyd@cluster0.q6opd6m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ProfileModule,
    FeedModule,
    RouterModule.register([
      {
        path: 'feed',
        module: FeedModule,
      },
      {
        path: 'profile',
        module: ProfileModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
