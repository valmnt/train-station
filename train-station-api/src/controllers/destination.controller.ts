import { Request, Response } from 'express';
import DestinationService from '../services/destination.service';
import TrainService from '../services/train.service';

class DestinationController {
  private destinationService: DestinationService;
  private trainService: TrainService

  constructor(destinationService: DestinationService, trainService: TrainService) {
    this.destinationService = destinationService
    this.trainService = trainService
  }

  async createDestination(req: Request, res: Response) {
    try {
      const body = req.body as {
        name: string;
        codeStation: string;
        category: "TER" | "TGV";
      };
  
      if (!body.name || !body.codeStation || !body.category) {
        res.status(400).json({ error: 'name, codeStation and category are required.' });
      } else {
        const destination = await this.destinationService.createDestination(body.name, body.codeStation, body.category);
        res.status(201).json(destination);
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async fetchDestinationsByName(req: Request, res: Response) {
    try {
      const name = req.params.name as string;
      const destination = await this.destinationService.fetchDestinationsByName(name);
      
      if (destination == null) {
        res.status(404).json({ error: 'Destination not found.' });
      } else {
        res.status(200).json(destination);
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async destroyDestinationByCode(req: Request, res: Response) {
    try {
      const code = req.params.code as string;
      const destination = await this.destinationService.fetchDestinationByCode(code);

      if (destination == null) {
        res.status(404).json({ error: 'Destination not found.' });
      } else {
        const trains = await this.trainService.fetchTrainsByDestination(code);
        if (trains.length > 0) {
          res.status(405).json({ error: 'You cannot delete a destination while it is being used by trains.' });
        } else {
          await this.destinationService.destroyDestination(destination);
          res.status(200).json();
        }
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateDestinationByCode(req: Request, res: Response) {
    try {
      const code = req.params.code as string;
      const destination = await this.destinationService.fetchDestinationByCode(code);

      if (destination == null) {
        res.status(404).json({ error: 'Destination not found.' });
      } else {
        const trains = await this.trainService.fetchTrainsByDestination(code);
        if (trains.length > 0) {
          res.status(405).json({ error: 'You cannot update a destination while it is being used by trains.' });
        } else {
          const destinationUpdated = await this.destinationService.updateDestination(destination, req.body);
          res.status(200).json(destinationUpdated);
        }
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default DestinationController;