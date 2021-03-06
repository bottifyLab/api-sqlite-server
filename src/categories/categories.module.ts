import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './categories.model';


@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([Category])
  ]
})
export class CategoriesModule {}
