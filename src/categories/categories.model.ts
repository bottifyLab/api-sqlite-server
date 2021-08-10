import { ApiProperty } from '@nestjs/swagger';

import { DataType, Model, Table, Column } from 'sequelize-typescript';

interface CategoryCreationAttrs {
    name: string;
}

@Table({tableName: 'categories'})
export class Category extends Model<Category, CategoryCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор категории'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Всякое', description: 'Название категории'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

}