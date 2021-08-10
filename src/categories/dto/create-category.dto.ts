import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({example: 'Всякое', description: 'Название категории'})
    readonly name: string;
}
