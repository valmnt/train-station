import express, { Router } from 'express';
import TrainService from '../services/train.service';
import TrainController from '../controllers/train.controller';
import DestinationService from '../services/destination.service';

const router: Router = express.Router();

const trainService = new TrainService();
const destinationService = new DestinationService();
const trainController = new TrainController(trainService, destinationService)

/**
 * @swagger
 * /train:
 *   post:
 *     summary: Create a new train
 *     description: Add a new train by providing the necessary details in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destination:
 *                 type: string
 *                 description: The code station
 *                 example: "PAR"
 *               departureTime:
 *                 type: string
 *                 description: The departure time of the train (ISO 8601 format)
 *                 example: "2023-09-22T08:00:00"
 *               arrivalTime:
 *                 type: string
 *                 description: The arrival time of the train (ISO 8601 format)
 *                 example: "2023-09-22T12:00:00"
 *     responses:
 *       201:
 *         description: Train created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', (req, res) => {
    trainController.createTrain(req, res);
});

/**
 * @swagger
 * /train/{id}:
 *   delete:
 *     summary: Delete a train by ID
 *     description: Deletes a train using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the train to delete
 *     responses:
 *       200:
 *         description: Train deleted successfully
 *       404:
 *         description: Train not found
 */
router.delete('/:id', (req, res) => {
    trainController.destroyTrain(req, res);
});

/**
 * @swagger
 * /train:
 *   get:
 *     summary: Fetch trains by destination and/or date
 *     description: Retrieve a list of trains based on the destination and/or date provided as query parameters.
 *     parameters:
 *       - in: query
 *         name: destination
 *         schema:
 *           type: string
 *         required: false
 *         description: The code station
 *         example: "PAR"
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: The date of the trains to filter (ISO 8601 format)
 *         example: "2023-09-22T12:00:00"
 *     responses:
 *       200:
 *         description: A list of trains matching the criteria
 *       400:
 *         description: Invalid parameters or missing query parameters
 *       404:
 *         description: No trains found for the given criteria
 */
router.get('/', (req, res) => {
    trainController.fetchTrainByDestinationAndTime(req, res);
});

export default router;