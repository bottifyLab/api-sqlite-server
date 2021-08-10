import { Controller, Render, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  @Render('index')
  index() {
    return;
  }

}
