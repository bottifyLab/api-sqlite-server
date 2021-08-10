import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './categories.model';


@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /*  СОЗДАНИЕ КАТЕГОРИИ */

  @ApiOperation({summary: 'Создание категории'})
  @ApiResponse({status: 200, type: Category})
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  /* ПОЛУЧЕНИЕ СПИСКА КАТЕГОРИЙ */

  @ApiOperation({summary: 'Получение списка категорий'})
  @ApiResponse({status: 200, type: [Category]})
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  /* ПОЛУЧЕНИЕ ОДНОЙ КАТЕГОРИИ */

  @ApiOperation({summary: 'Получение категории'})
  @ApiResponse({status: 200, type: Category})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  /* РЕДАКТИРОВАНИЕ КАТЕГОРИИ */

  @ApiOperation({summary: 'Редактирование категории'})
  @ApiResponse({status: 200, type: Category})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  /* УДАЛЕНИЕ КАТЕГОРИИ */

  @ApiOperation({summary: 'Удаление категории'})
  @ApiResponse({status: 200})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
