import { Repository } from "sequelize-typescript";
import sequelize from "../configs/database";
import Destination from "../models/destination.model";
import { Op } from 'sequelize';
import Train from "../models/train.model";

class DestinationService {
    private destinationRepository: Repository<Destination>;

    constructor() {
        this.destinationRepository = sequelize.getRepository(Destination)
    }

    async createDestination(name: string, codeStation: string, category: string): Promise<Destination> {
        return await this.destinationRepository.create({
            name: name,
            codeStation: codeStation,
            category: category,
        });
    }

    async fetchDestinationsByName(name: string): Promise<Array<Destination> | null> {
        return await this.destinationRepository.findAll({
            where: {
              name: {
                [Op.like]: `%${name}%`,
              },
            },
          });
    }

    async destroyDestination(destination: Destination): Promise<void> {
      await destination.destroy();
    }

    async updateDestination(destination: Destination, body: {
      name: string | undefined;
      codeStation: string | undefined;
      category: "TER" | "TGV" | undefined;
    }): Promise<Destination> {
      if (body.name != undefined) {
        destination!.name = body.name;
      }
      
      if (body.codeStation != undefined) {
        destination!.codeStation = body.codeStation;
      }
      
      if (body.category != undefined) {
        destination!.category = body.category;
      }
      return await destination!.save()
    }

    async fetchDestinationByCode(code: string):Promise<Destination | null> {
      return await this.destinationRepository.findOne({ where: { codeStation: code } });
    }
}

export default DestinationService;
