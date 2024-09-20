import { Column, Table, Model, DataType, Unique, PrimaryKey, Default } from 'sequelize-typescript';

@Table
class Destination extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  @Column(DataType.TEXT)
  public name!: string;

  @Unique({
    name: 'unique_code_station',
    msg: 'the code station is already taken.',
  })
  @Column(DataType.TEXT)
  public codeStation!: string;

  @Column(DataType.ENUM('TER', 'TGV'))
  public category!: 'TER' | 'TGV';
}

export default Destination;
