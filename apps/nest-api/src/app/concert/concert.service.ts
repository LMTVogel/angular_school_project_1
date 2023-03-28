import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Concert, ConcertDocument} from "./schemas/concert.schema";

@Injectable()
export class ConcertService {
  constructor(
    @InjectModel(Concert.name)
    private concertModel: Model<ConcertDocument>,
  ) {}

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
}
