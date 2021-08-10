import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers() {
    return [
        {id: 1, name: 'Benjamin'},
        {id: 2, name: 'Helen'}
    ];
  }
}
