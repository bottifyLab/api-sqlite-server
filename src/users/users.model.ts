import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../roles/user-roles.model'
import { Role } from '../roles/roles.model'

import { DataType, Model, Table, Column, BelongsToMany } from 'sequelize-typescript';

interface UserCreationAttrs {
    login: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'bottify', description: 'Логин пользователя'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    // @ApiProperty({example: 'name@email.ru', description: 'Почтовый адрес пользователя'})
    // @Column({type: DataType.STRING, unique: true, allowNull: false})
    // email: string;

    @ApiProperty({example: '12345678', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}