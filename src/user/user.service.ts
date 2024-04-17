import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from './user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user) private userRepository: Repository<user>,
    private jwtService: JwtService,
  ) {}

  mysalt = '$2a$10$7h/0SQ4FXRG5eX3602o3/.aO.RYkxKuhGkzvIXHLUiMJlFt1P.6Pe';
  saltRound = 10;

  // Desplaying user data
  async get(): Promise<user[]> {
    return this.userRepository.find();
  }

  // Get one user by id
  getOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

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

  // Update user by id
  update(userid: number, updateuserdto: UpdateUserDto) {
    return this.userRepository.update(userid, updateuserdto);
  }

  // Delete user by id
  delete(userid: number) {
    return this.userRepository.delete(userid);
  }

  // Fing user by Email
  findByEmail(EMAIL: string) {
    return this.userRepository.findOne({ where: { EMAIL } });
  }

  // Login Authentaction
  async login(EMAIL: string, PASSWORD: string) {
    const user = await this.findByEmail(EMAIL);
    if (user) {
      const match_pass = await bcrypt.compare(PASSWORD, user.PASSWORD);
      if (match_pass) {
        const token = await this.jwttoken(user);
        return { status: true, token: token.access_token };
      } else {
        return { status: false };
      }
    } else {
      return { status: false };
    }
  }

  // JWT Token Generation
  async jwttoken(user: any) {
    const payload = { EMAIL: user.EMAIL, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
