import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({})
export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid') // int, bigint, uuid. Eğer sadece PrimaryColumn yazarsak default olarak int olur ve generate etmez
    id: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @Column('boolean', { default: false, select: false }) // select:false yaparsak bu kolon select sorgularında gelmez
    isDeleted: boolean;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
