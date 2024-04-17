import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(user) private userRepository: Repository<user>,
    private jwtService: JwtService,
  ) {}
  // Login Authentaction
  async login(EMAIL: string, PASSWORD: string) {
    Logger.log('info');
    const user = await this.findByEmail(EMAIL);
    if (user) {
      const match_pass = await bcrypt.compare(PASSWORD, user.PASSWORD);
      if (match_pass) {
        const token = await this.jwttoken(user);
        return { status: true, token: token.access_token };
      } else {
        return { status: true };
      }
    } else {
      return { status: true };
    }
  }

  // Fing user by Email
  findByEmail(EMAIL: string) {
    return this.userRepository.findOne({ where: { EMAIL } });
  }

  // JWT Token Generation
  async jwttoken(user: any) {
    const payload = { EMAIL: user.EMAIL, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
