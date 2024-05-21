import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { FeedModule } from './feed/feed.module';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as cors from 'cors';
import { IdGeneratorService } from './services/id-generator/id-generator.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dhananjaymanjare:zl8aoeIHs49j2Zyd@cluster0.q6opd6m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ConfigModule.forRoot(),
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
  providers: [AppService, IdGeneratorService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors({
        origin: 'http://localhost:4200', // Replace with your Angular app URL
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
      }))
      .forRoutes('*');
  }
}

