import express, { Application } from 'express';
import database from './configs/database';
import destinationRoute from './routes/destination.route';
import trainRoute from './routes/train.route';
import sequelize from './configs/database';

const app: Application = express();
const cors = require('cors');
const PORT = process.env.NODE_LOCAL_PORT;

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      servers: [{ url: 'http://localhost:3000' }]
    },
  },
  apis: ['./dist/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

database.authenticate()
  .then(async () => {
    console.log('Successfully connected to the database.');

    await sequelize.sync();
    app.use(cors());
    app.use(express.json());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use('/destination', destinationRoute);
    app.use('/train', trainRoute);

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err: Error) => {
      console.error('Unable to connect to the database:', err);
  });