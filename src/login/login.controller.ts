import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('/login')
  log(@Body() loginDto: any) {
    console.log(loginDto.EMAIL, loginDto.PASSWOR);
    return this.loginService.login(loginDto.EMAIL, loginDto.PASSWORD);
  }
}
