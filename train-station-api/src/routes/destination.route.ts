import express, { Router } from 'express';
import DestinationController from '../controllers/destination.controller';
import DestinationService from '../services/destination.service';
import TrainService from '../services/train.service';

const router: Router = express.Router();

const destinationService = new DestinationService();
const trainService = new TrainService()
const destinationController = new DestinationController(destinationService, trainService);


/**
 * @swagger
 * /destination:
 *   post:
 *     summary: Create a new destination
 *     description: Add a new destination by providing the necessary details in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the destination
 *                 example: "Paris"
 *               codeStation:
 *                 type: string
 *                 description: The code of the station
 *                 example: "FRPAR"
 *               category:
 *                 type: string
 *                 description: The category of the destination
 *                 enum: [TER, TGV]
 *                 example: "TGV"
 *     responses:
 *       201:
 *         description: Destination created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', (req, res) => {
    destinationController.createDestination(req, res);
});


/**
 * @swagger
 * /destination/{name}:
 *   get:
 *     summary: Fetch destinations by name
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the destination to search for
 *     responses:
 *       200:
 *         description: A list of destinations matching the name
 *       404:
 *         description: No destinations found
 */
router.get('/:name', (req, res) => {
    destinationController.fetchDestinationsByName(req, res);
});

/**
 * @swagger
 * /destination/{code}:
 *   delete:
 *     summary: Delete a destination by code
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The code station of the destination to delete
 *     responses:
 *       200:
 *         description: Destination deleted successfully
 *       404:
 *         description: Destination not found
 */
router.delete('/:code', (req, res) => {
    destinationController.destroyDestinationByCode(req, res);
});

/**
 * @swagger
 * /destination/{code}:
 *   patch:
 *     summary: Update a destination by code
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The code station of the destination to update
 *     responses:
 *       200:
 *         description: Destination updated successfully
 *       404:
 *         description: Destination not found
 */
router.patch('/:code', (req, res) => {
    destinationController.updateDestinationByCode(req, res);
});

export default router;
