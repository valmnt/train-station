import { Repository } from "sequelize-typescript";
import sequelize from "../configs/database";
import Train from "../models/train.model";
import { Op, fn, col } from 'sequelize';

class TrainService {
    private trainRepository: Repository<Train>;

    constructor() {
        this.trainRepository = sequelize.getRepository(Train)
    }

    async createTrain(destination: string, plateform: string, departureTime: Date, arrivalTime: Date): Promise<Train> {
        return await this.trainRepository.create({
            destination: destination,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            plateform: plateform,
        });
    }

    async setPlateform(category: 'TER' | 'TGV', departureTime: string): Promise<string | null> {
        let plateforms = category === 'TER' ? ['A', 'B', 'C', 'D', 'E'] :  ['D', 'E'];

        for (let plateform of plateforms) {
            const tenMinutesInMilliseconds = 10 * 60 * 1000;
            let trains = await this.trainRepository.findAll({ where: { plateform: plateform } });

            let isNoDepartureAround = trains.every((train) => {
                let trainDeparture = new Date(train.departureTime);
                let currentDeparture = new Date(departureTime);
                let interval = Math.abs(trainDeparture.getTime() - currentDeparture.getTime());
                let isOutsideInterval = interval > tenMinutesInMilliseconds;
                return isOutsideInterval;
            });

            if (isNoDepartureAround) {
                return plateform;
            }
        }
        return null
    }

    async fetchTrainsByDestination(destination: string): Promise<Array<Train>> {
        return await this.trainRepository.findAll({ where: { destination: destination } })
    }

    async fetchTrainById(id: string): Promise<Train | null> {
        return await this.trainRepository.findOne({ where: { id: id } })
    }

    async fetchTrainsByTime(hour: number): Promise<Array<Train>> {
        return await this.trainRepository.findAll({ where: {
            [Op.and]: [
                sequelize.where(fn('EXTRACT', fn('HOUR FROM', col('departureTime'))), hour)
            ]
        } })
    }

    async fetchTrainsByDestinationAndTime(destination: string, hour: number): Promise<Array<Train>> {
        return await this.trainRepository.findAll({ where: {
            destination: destination,
            [Op.and]: [
                sequelize.where(fn('EXTRACT', fn('HOUR FROM', col('departureTime'))), hour)
            ]
        } })
    }

    async destroyTrain(train: Train): Promise<void> {
        await train.destroy();
    }
}

export default TrainService;