import { Sequelize } from 'sequelize-typescript';
import Destination from '../models/destination.model';
import Train from '../models/train.model';

const sequelize = new Sequelize({
    database: process.env.POSTGRESDB_DATABASE,
    username: process.env.POSTGRESDB_USER,
    password: process.env.POSTGRESDB_ROOT_PASSWORD,
    host: 'postgresdb',
    dialect: 'postgres',
    models: [Destination, Train],
    repositoryMode: true,
  });

export default sequelize;