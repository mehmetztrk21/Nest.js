import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

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

    async findOne(id: ObjectId): Promise<Book | null> {
        const book = await this.bookRepository.findOneBy({ _id: new ObjectId(id) });
        if (!book) throw new NotFoundException();
        return book;
    }
    async update(id: ObjectId, data: Partial<Book>): Promise<Book | null> {
        const book = await this.bookRepository.findOne({
            where: { _id: new ObjectId(id) },
        });
        if (!book) throw new NotFoundException();
        Object.assign(book, data);
        return await this.bookRepository.save(book);
    }

    async remove(id: ObjectId): Promise<void> {
        await this.bookRepository.delete({ _id: new ObjectId(id) });
    }
}
