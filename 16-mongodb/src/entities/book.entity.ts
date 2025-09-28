import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
@Entity()
export class Book {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    title: string;

    @Column()
    page: number;

    @Column()
    author: string;
}
