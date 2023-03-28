import {
  Body,
  Controller, Get, Post,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { Concert } from './schemas/concert.schema';

@Controller('concerts')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  async getConcerts() {
    return await this.concertService.getConcerts();
  }

  @Post()
  // TODO: add guards for auth
  async createConcert(@Body() concert: Concert): Promise<Concert> {
    return await this.concertService.createConcert(concert)
  }
}
