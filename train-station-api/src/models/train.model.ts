import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
class Train extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public id!: string;

    @Column(DataType.TEXT)
    public destination!: string

    @Column(DataType.DATE)
    public departureTime!: Date

    @Column(DataType.DATE)
    public arrivalTime!: Date

    @Column(DataType.TEXT)
    public plateform!: string
}

export default Train;