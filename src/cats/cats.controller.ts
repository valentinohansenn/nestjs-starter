import {
  Controller,
  Body,
  Get,
  HttpCode,
  Post,
  Param,
  Header,
  Redirect,
} from '@nestjs/common';
import { CatsService } from './cats.service';

type CreateCatDto = {
  name: string;
  age: number;
  breed?: string;
};

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(204) // Specify a custom HTTP status code for the response
  @Header('Cache-Control', 'no-store')
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id') // Get specific id
  // Redirect to another page, both arguments are optional
  // default value of statusCode is 302 (found) if ommitted
  @Redirect('https://nestjs.com', 301)
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }
}
