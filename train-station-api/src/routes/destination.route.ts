import express, { Router } from 'express';
import DestinationController from '../controllers/destination.controller';
import DestinationService from '../services/destination.service';
import TrainService from '../services/train.service';

const router: Router = express.Router();

const destinationService = new DestinationService();
const trainService = new TrainService()
const destinationController = new DestinationController(destinationService, trainService);

router.post('/', (req, res) => {
    destinationController.createDestination(req, res);
});

router.get('/:name', (req, res) => {
    destinationController.fetchDestinationsByName(req, res);
});

router.delete('/:code', (req, res) => {
    destinationController.destroyDestinationByCode(req, res);
});

router.patch('/:code', (req, res) => {
    destinationController.updateDestinationByCode(req, res);
});

export default router;
