import {
  Body,
  Controller, Get, Post,
} from '@nestjs/common';
import { Delete, Param, Put } from '@nestjs/common/decorators';
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
  
  @Delete(':id')
  async deleteConcert(@Param('id') id: string): Promise<Concert> {
    return await this.concertService.deleteConcert(id);
  }

  @Put(':id')
  async updateConcert(@Param('id') id: string, @Body() concert: Concert): Promise<Concert> {
    return await this.concertService.updateConcert(id, concert);
  }
}
