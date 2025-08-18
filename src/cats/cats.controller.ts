import {
  Controller,
  Body,
  Get,
  HttpCode,
  Post,
  Param,
  Header,
  Redirect,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import type { CreateCatDto } from './dto/create-cat.dto';
import { createCatSchema } from './dto/create-cat.dto';
import type { Cat } from './interfaces/cat.interface';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ParseIntPipe } from 'src/pipes/parse-int.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(204) // Specify a custom HTTP status code for the response
  @Header('Cache-Control', 'no-store')
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  // Parameterized query parameters (e.g., GET /cats?age=2&breed=Persian)
  async findAll(
    @Query('age') age: number,
    @Query('breed') breed: string,
  ): Promise<Cat[]> {
    return this.catsService.findAll(age, breed);
  }

  @Get(':id') // Get specific id
  // Redirect to another page, both arguments are optional
  // default value of statusCode is 302 (found) if ommitted
  @Redirect('https://nestjs.com', 301)
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    // ParseIntPipe ensures the parameter is an integer, otherwise the body will not be executed
    return this.catsService.findOne(id);
  }
}
