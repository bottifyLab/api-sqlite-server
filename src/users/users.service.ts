import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { User } from './users.model';
import { RolesService } from '../roles/roles.service'

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const role = await this.roleService.getRoleByValue('USER')
    await user.$set('roles',[role.id])
    user.roles = [role]
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll({include: {all: true}});
    return users;
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({where: {login}, include: {all: true }});
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('Пользователь или роль не существует', HttpStatus.NOT_FOUND)
  }

  async findOne(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (user) {
      return user;
    }
    throw new HttpException('Пользователь не существует', HttpStatus.NOT_FOUND)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
