import { Controller, Render, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return;
  }

  @Get('/users')
  getUsers() {
    return [{id: 1, name: 'Benjamin'}]
  }

}
