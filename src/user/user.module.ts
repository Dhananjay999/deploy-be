import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './user.constants';
import { UserController } from './user.controller';
import { user } from './user.entity';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([user]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
