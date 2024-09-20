import express, { Router } from 'express';
import TrainService from '../services/train.service';
import TrainController from '../controllers/train.controller';
import DestinationService from '../services/destination.service';

const router: Router = express.Router();

const trainService = new TrainService();
const destinationService = new DestinationService();
const trainController = new TrainController(trainService, destinationService)

router.post('/', (req, res) => {
    trainController.createTrain(req, res);
});

router.delete('/:id', (req, res) => {
    trainController.destroyTrain(req, res);
});

router.get('/', (req, res) => {
    trainController.fetchTrainByDestinationAndTime(req, res);
});

export default router;