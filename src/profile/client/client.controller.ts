import { Controller, Get } from '@nestjs/common';

@Controller('client')
export class ClientController {
  @Get()
  getHello(): string {
    return 'client hello';
  }
}
