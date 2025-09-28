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
import { ObjectId } from 'mongodb';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Post()
    async create(@Body() body: Partial<Book>): Promise<Book> {
        return this.bookService.create(body);
    }

    @Put(':id')
    async update(
        @Param('id') id: ObjectId,
        @Body() body: Partial<Book>,
    ): Promise<Book | null> {
        return this.bookService.update(id, body);
    }

    @Get()
    async findAll(): Promise<Book[]> {
        return this.bookService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: ObjectId): Promise<Book | null> {
        console.log(id);
        return this.bookService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: ObjectId): Promise<void> {
        return this.bookService.remove(id);
    }
}
