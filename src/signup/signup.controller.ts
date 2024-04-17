import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}
  @Post()
  store(@Body() createuserdto: CreateUserDto) {
    return this.signupService.create(createuserdto);
  }
}
