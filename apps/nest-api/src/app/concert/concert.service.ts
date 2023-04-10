import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminGuard } from '../roles/roles.guard';
import {Concert, ConcertDocument} from "./schemas/concert.schema";
import { Neo4jService } from '../neo4j/neo4j.service';

@Injectable()
export class ConcertService {
  constructor(
    @InjectModel(Concert.name)
    private concertModel: Model<ConcertDocument>,
    private neo4jService: Neo4jService,
  ) {}

  @UseGuards(AdminGuard)
  async createConcert(
    concert: Concert,
  ):Promise<Concert> {
    const newConcert = new this.concertModel(concert);

    await newConcert.save().catch((err) => {
      console.log('Error: ', err.message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    });

    return newConcert;
  }

  async getConcerts(): Promise<Concert[]> {
    return await this.concertModel.find();
  }

  async getConcertById(id: string): Promise<Concert> {
    return await this.concertModel.findOne({ id: id });
  }

  @UseGuards(AdminGuard)
  async deleteConcert(id: string): Promise<Concert> {
    const concert = await this.concertModel.findOneAndDelete({ id: id });

    if (concert == null) {
      throw new HttpException('Concert not found', HttpStatus.NOT_FOUND);
    }

    return concert;
  }

  @UseGuards(AdminGuard)
  async updateConcert(id: string, concert: Concert): Promise<Concert> {
    return await this.concertModel.findOneAndUpdate({ id: id }, concert, { new: true });
  }

  async recommendConcerts(): Promise<Concert[]> {
    const concerts = [] as Concert[];
    const recommendQuery = await this.neo4jService.singleRead(`MATCH (user1:User)-[:HAS_BOUGHT]->(:Ticket)-[:FOR]->(concert:Concert)<-[:FOR]-(:Ticket)<-[:HAS_BOUGHT]-(user2:User)-[:HAS_BOUGHT]->(:Ticket)-[:FOR]->(otherConcert:Concert)
    WHERE NOT (user1)-[:HAS_BOUGHT]->(:Ticket)-[:FOR]->(otherConcert)
    AND NOT otherConcert = concert
    RETURN otherConcert`);

    for (const concert of recommendQuery.records) {
      console.log(concert);
      const concertId = concert.get('otherConcert').properties.id;
      const concertObject = await this.getConcertById(concertId);
      concerts.push(concertObject);
    }
    
    return concerts;
  }
}
