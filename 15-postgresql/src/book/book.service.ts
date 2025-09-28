import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>,
    ) { }

    async create(data: Partial<Book>): Promise<Book> {
        const book = this.bookRepository.create(data);
        return this.bookRepository.save(book);
    }

    async findAll(): Promise<Book[]> {
        return this.bookRepository.find();
    }

    async findOne(id: number): Promise<Book | null> {
        const book = this.bookRepository.findOneBy({ id });
        if (!book) throw new NotFoundException();
        return book;
    }
    async update(id: number, data: Partial<Book>): Promise<Book | null> {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book) throw new NotFoundException();
        Object.assign(book, data);
        return await this.bookRepository.save(book);
    }

    async remove(id: number): Promise<void> {
        await this.bookRepository.delete(id);
    }
}
