import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';
import { User } from './users/users.model';

import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/categories.model';

import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';

import { UserRoles } from './roles/user-roles.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
        dialect: 'sqlite',
        storage: './db.sqlite',
        models:  [Category, User, Role, UserRoles],
        autoLoadModels: true
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    RolesModule
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
