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
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from 'src/cats/interfaces/cat.interface';

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
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }
}
