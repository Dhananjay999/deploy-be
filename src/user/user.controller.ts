import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('')
export class UserController {
  constructor(private userservice: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  getuser(@Req() request: Request) {
    console.log("getuser");
    
    return this.userservice.get();
  }

  @Get('/:userid')
  getOneuser(@Param('userid', ParseIntPipe) userid: number) {
    return this.userservice.getOne(userid);
  }

  @Post()
  store(@Body() createuserdto: CreateUserDto) {
    return this.userservice.create(createuserdto);
  }

  @Patch('/:userid')
  updateuser(
    @Body() updateuserdto: UpdateUserDto,
    @Param('userid', ParseIntPipe) userid: number,
  ) {
    return this.userservice.update(userid, updateuserdto);
  }

  @Delete('/:userid')
  delete(@Param('userid', ParseIntPipe) userid: number) {
    return this.userservice.delete(userid);
  }

  @Post('/login')
  log(@Body() loginDto: any) {
    return this.userservice.login(loginDto.EMAIL, loginDto.PASSWORD);
  }
}
