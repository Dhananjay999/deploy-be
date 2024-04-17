import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { user } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(user) private userRepository: Repository<user>,
  ) {}
  mysalt = '$2a$10$7h/0SQ4FXRG5eX3602o3/.aO.RYkxKuhGkzvIXHLUiMJlFt1P.6Pe';
  saltRound = 10;
  // User Creation
  async create(createuserdto: CreateUserDto) {
    const user = await this.findByEmail(createuserdto.EMAIL);
    if (!user) {
      const hast_pass = await bcrypt.hash(createuserdto.PASSWORD, this.mysalt);
      createuserdto.PASSWORD = hast_pass;
      this.userRepository.save(createuserdto);
      return { status: true };
    } else {
      return { status: false };
    }
  }
  // Fing user by Email
  findByEmail(EMAIL: string) {
    return this.userRepository.findOne({ where: { EMAIL } });
  }
}
