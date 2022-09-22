import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({example: 'bottify', description: 'Логин пользователя'})
    readonly login: string;

    @ApiProperty({example: '12345678', description: 'Пароль пользователя'})
    readonly password: string;
}

