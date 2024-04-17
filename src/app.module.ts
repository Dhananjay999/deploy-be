import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { user } from './user/user.entity';
import { UserModule } from './user/user.module';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { PollDescModule } from './poll_desc/poll_desc.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my-database-1.cnkekblaoaaq.ap-south-1.rds.amazonaws.com',
      port: 3306,
      username: 'superDBAdmin',
      password: 'ASDSASHU',
      database: 'new_schema',
      entities: [user],
      synchronize: true,
    }),
    SignupModule,
    LoginModule,
    PollDescModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
