import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from './user-roles.model'
import { User } from '../users/users.model'

import { DataType, Model, Table, Column, BelongsToMany } from 'sequelize-typescript';

interface RoleCreationAttrs {
    value: string;
}

@Table({tableName: 'roles', createdAt: false, updatedAt: false})
export class Role extends Model<Role,RoleCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Значение роли'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];

}


