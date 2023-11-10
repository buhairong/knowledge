import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('log')
@UseGuards(JwtGuard)
export class LogController {
  @Get()
  getTest() {
    return 'test';
  }

  @Post()
  postTest(@Body() dto: any) {
    return 'post test';
  }
}
