import express, { Application } from 'express';
import database from './configs/database';
import destinationRoute from './routes/destination.route';
import trainRoute from './routes/train.route';
import sequelize from './configs/database';

const app: Application = express();
const cors = require('cors');
const PORT = process.env.NODE_LOCAL_PORT;

database.authenticate()
  .then(async () => {
    console.log('Successfully connected to the database.');

    await sequelize.sync();
    app.use(cors());
    app.use(express.json());
    app.use('/destination', destinationRoute);
    app.use('/train', trainRoute);

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err: Error) => {
      console.error('Unable to connect to the database:', err);
  });