import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { User } from './users/users.model';

import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/categories.model';


@Module({
  imports: [
    SequelizeModule.forRoot({
        dialect: 'sqlite',
        storage: './database.sqlite',
        models: [User, Category],
        autoLoadModels: true
    }),
    UsersModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
