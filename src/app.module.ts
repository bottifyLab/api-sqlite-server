import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './users/users.module';
import { User } from './users/users.model';

import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/categories.model';

import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';

import { UserRoles } from './roles/user-roles.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
        dialect: 'sqlite',
        storage: './database.sqlite',
        models: [User, Category, Role, UserRoles],
        autoLoadModels: true
    }),
    UsersModule,
    CategoriesModule,
    RolesModule
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
