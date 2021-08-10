import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto'
import { UsersService } from '../users/users.service'
import { User } from '../users/users.model';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(createUserDto);
    return this.generateToken(user)
  }

  async registration(createUserDto: CreateUserDto) {

    const candidate = await this.userService.getUserByEmail(createUserDto.email);

    if (candidate) {
        throw new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 5);
    const user = await this.userService.create({...createUserDto, password: hashPassword});
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {
        id: user.id,
        email: user.email,
        roles: user.roles
    }
    return {
        token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
        return user;
    }
    throw new UnauthorizedException({message: 'Неверный пароль или email'})
  }

}












