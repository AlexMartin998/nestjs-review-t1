import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from 'src/shared/dto';
import { createRandomSku } from 'src/shared/utils';
import { ProductDtoDocsRes } from './dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { sku, ...rest } = createProductDto;
      const product = this.productRepository.create({
        ...rest,
        sku: sku || createRandomSku('Product'),
      });

      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto, filterParams: ProductDtoDocsRes) {
    const { limit, offset } = paginationDto;

    const [products, count] = await Promise.all([
      this.productRepository.find({
        take: limit,
        skip: offset,
        // filter - exact match ----
        where: filterParams,
      }),
      this.productRepository.count(),
    ]);

    return { count, products };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`Product with id '${id} not found`);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      // this.findOne(id);
      const product = await this.productRepository.preload({
        id,
        ...updateProductDto,
      });
      if (!product)
        throw new NotFoundException(`Product with id '${id} not found`);

      return await this.productRepository.save(product);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);
  }

  private handleDBErrors(error: any): never {
    const formattedMessage = error.detail.replace(
      /Key \((.*?)\)=\((.*?)\) already exists\./,
      '$2 already exists.',
    );

    if (error.code === '23505') throw new BadRequestException(formattedMessage);
    else if (error.code === 'err-001')
      throw new NotFoundException(error.detail);
    else if (error.code === '23503')
      throw new BadRequestException(formattedMessage);

    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
