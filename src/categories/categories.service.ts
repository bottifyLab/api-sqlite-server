import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './categories.model';

@Injectable()
export class CategoriesService {

  constructor(@InjectModel(Category) private categoryRepository: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.create(createCategoryDto);
    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findByPk(id);
    if (category === null) {
      return "not found"
    } else {
      return category;
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
