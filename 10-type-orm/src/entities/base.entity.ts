import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    VersionColumn,
} from 'typeorm';
@Entity({})
export abstract class BaseEntity {
    // extends nestjs in BaseEntity classı yaparsak ek özelliklere de erişiriz.
    @PrimaryGeneratedColumn('uuid') // int, bigint, uuid. Eğer sadece PrimaryColumn yazarsak default olarak int olur ve generate etmez
    id: string;
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('boolean', { default: false, select: false }) // select:false yaparsak bu kolon select sorgularında gelmez
    isDeleted: boolean;

    @DeleteDateColumn({ select: false }) // soft delete için kullanılır, select:false yaparsak bu kolon select sorgularında gelmez
    deletedAt: Date;

    @VersionColumn({ default: 1, select: false }) // optimistic locking için kullanılır. 2 kişi aynı veriyi güncellerse hata verir. select:false yaparsak bu kolon select sorgularında gelmez
    version: number;
}
