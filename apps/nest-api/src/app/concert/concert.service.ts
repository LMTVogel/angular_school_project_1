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

  async getConcertById(id: string): Promise<Concert> {
    return await this.concertModel.findOne({ id: id });
  }

  async deleteConcert(id: string): Promise<Concert> {
    const concert = await this.concertModel.findOneAndDelete({ id: id });

    if (concert == null) {
      throw new HttpException('Concert not found', HttpStatus.NOT_FOUND);
    }

    return concert;
  }

  async updateConcert(id: string, concert: Concert): Promise<Concert> {
    return await this.concertModel.findOneAndUpdate({ id: id }, concert, { new: true });
  }
}
