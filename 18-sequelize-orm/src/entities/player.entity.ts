import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    createdAt: true,
    updatedAt: true,
    tableName: 'players',
    version: true,
})
export class Player extends Model<Player> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare age: number;
}
