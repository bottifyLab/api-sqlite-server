import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthService } from './auth.service';


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}


  @ApiOperation({summary: 'Вход'})
  @ApiResponse({status: 200})
  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @ApiOperation({summary: 'Регистрация'})
  @ApiResponse({status: 200})
  @Post('/registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

}






