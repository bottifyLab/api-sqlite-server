import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './users/users.module';
import { User } from './users/users.model';

import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/categories.model';

import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';

import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
        dialect: 'sqlite',
        storage: './data.sqlite',
        models: [User, Category, Role, UserRoles],
        autoLoadModels: true
    }),
    UsersModule,
    CategoriesModule,
    RolesModule,
    AuthModule
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
