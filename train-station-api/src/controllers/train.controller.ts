import { Request, Response } from 'express';
import TrainService from "../services/train.service";
import DestinationService from '../services/destination.service';

class TrainController {
    private trainService: TrainService
    private destinationService: DestinationService

    constructor(trainService: TrainService, destinationService: DestinationService) {
        this.trainService = trainService
        this.destinationService = destinationService
    }

    async createTrain(req: Request, res: Response) {
        try {
            const body = req.body as {
                destination: string;
                departureTime: string;
                arrivalTime: string;
              };
            
            if (!body.destination || !body.departureTime || !body.arrivalTime) {
                res.status(400).json({ error: 'destination, departureTime and arrivalTime are required.' });
                return;
            }

            const regex = /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}\b/
            if (!body.departureTime.match(regex)) {
                res.status(422).json({ error: 'departureTime is not correct.' });
                return;
            }

            if (!body.arrivalTime.match(regex)) {
                res.status(422).json({ error: 'arrivalTime is not correct.' });
                return;
            }

            if (new Date(body.departureTime) > new Date(body.arrivalTime)) {
                res.status(400).json({ error: 'Departure time is later than arrival time.' });
                return;
            }
            
            const destination = await this.destinationService.fetchDestinationByCode(body.destination)
            if (destination == null) {
                res.status(404).json({ error: 'Destination cannot be found.' });
            } else {
                const plateform = await this.trainService.setPlateform(destination.category, body.departureTime);
                if (plateform == null) {
                    res.status(422).json({ error: 'There is no plateform available.' });
                } else {
                    const train = await this.trainService.createTrain(
                        destination.codeStation,
                        plateform,
                        new Date(body.departureTime), 
                        new Date(body.arrivalTime)
                    );
                    res.status(201).json(train);
                }
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async destroyTrain(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const train = await this.trainService.fetchTrainById(id);
    
            if (train == null) {
                res.status(404).json({ error: 'Train cannot be found.' });
            } else {
                await this.trainService.destroyTrain(train);
                res.status(200).json();
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async fetchTrainByDestinationAndTime(req: Request, res: Response) {
        try {
            const destination = req.query.destination as string;
            const date = req.query.date as string;
    
            if (!destination && !date) {
                res.status(400).json({ error: 'destination and/or date are required.' });
                return;
            }
    
            if (destination && date) {
                const trains = await this.trainService.fetchTrainsByDestinationAndTime(destination, date);
                res.status(200).json(trains);
                return;
            }
    
            if (date) {
                const trains = await this.trainService.fetchTrainsByTime(date);
                res.status(200).json(trains);
                return;
            }
    
            if (destination) {
                const trains = await this.trainService.fetchTrainsByDestination(destination);
                res.status(200).json(trains);
                return;
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default TrainController;