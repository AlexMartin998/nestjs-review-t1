import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { ApiDocumentation } from 'src/shared/decorators';
import { PaginationDto } from 'src/shared/dto';
import { ProductDtoDocsRes } from './dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products') // set tag for all endpoints
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiDocumentation(
    {
      status: 201,
      description: 'Product successfully created',
      type: ProductDtoDocsRes,
    },
    { status: 400, description: 'Bad Request' },
    { status: 401, description: 'Unauthorized' },
    { status: 500, description: 'Internal server error' },
    {
      status: 403,
      description: 'Forbidden. Does not have the necessary permits',
    },
  )
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiDocumentation(
    {
      status: 200,
      description: 'Return all products',
      type: [ProductDtoDocsRes],
    },
    { status: 400, description: 'Bad Request' },
    { status: 401, description: 'Unauthorized' },
    { status: 500, description: 'Internal server error' },
    {
      status: 403,
      description: 'Forbidden. Does not have the necessary permits',
    },
  )
  // @ApiQuery({
  //   name: 'limit',
  //   type: Number,
  //   required: false,
  // })
  // @ApiQuery({
  //   name: 'offset',
  //   type: Number,
  //   required: false,
  // })
  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query() filterParams: ProductDtoDocsRes,
  ) {
    return this.productsService.findAll(paginationDto, filterParams);
  }

  @ApiDocumentation(
    {
      status: 200,
      description: 'Return a product',
      type: ProductDtoDocsRes,
    },
    { status: 400, description: 'Bad Request' },
    { status: 404, description: 'Product not found' },
    { status: 401, description: 'Unauthorized' },
    { status: 500, description: 'Internal server error' },
    {
      status: 403,
      description: 'Forbidden. Does not have the necessary permits',
    },
  )
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @ApiBody({ type: CreateProductDto })
  @ApiDocumentation(
    {
      status: 200,
      description: 'Product successfully updated',
      type: ProductDtoDocsRes,
    },
    { status: 400, description: 'Bad Request' },
    { status: 404, description: 'Product not found' },
    { status: 401, description: 'Unauthorized' },
    { status: 500, description: 'Internal server error' },
    {
      status: 403,
      description: 'Forbidden. Does not have the necessary permits',
    },
  )
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiDocumentation(
    { status: 204, description: 'Product successfully removed' },
    { status: 400, description: 'Bad Request' },
    { status: 404, description: 'Product not found' },
    { status: 401, description: 'Unauthorized' },
    { status: 500, description: 'Internal server error' },
    {
      status: 403,
      description: 'Forbidden. Does not have the necessary permits',
    },
  )
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
