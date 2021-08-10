import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { User } from './users.model';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /*  СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ */

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  /* ПОЛУЧЕНИЕ СПИСКА ПОЛЬЗОВАТЕЛЕЙ */

  @ApiOperation({summary: 'Получение списка'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /* ВЫДАТЬ РОЛЬ ПОЛЬЗОВАТЕЛЮ */
  @ApiOperation({summary: 'Выдать роль'})
  @ApiResponse({status: 200})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
