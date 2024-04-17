import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { user } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SignupController],
  providers: [SignupService],
  imports: [TypeOrmModule.forFeature([user])],
})
export class SignupModule {}
