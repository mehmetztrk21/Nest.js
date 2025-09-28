import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { Book } from 'src/entities/book.entity';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Post()
    async create(@Body() body: Partial<Book>): Promise<Book> {
        return this.bookService.create(body);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: Partial<Book>,
    ): Promise<Book | null> {
        return this.bookService.update(id, body);
    }

    @Get()
    async findAll(): Promise<Book[]> {
        return this.bookService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Book | null> {
        return this.bookService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.bookService.remove(id);
    }
}
