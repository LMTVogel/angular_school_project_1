import {
  Body,
  Controller, Get, Post,
} from '@nestjs/common';
import { Delete, Param, Put, UseGuards } from '@nestjs/common/decorators';
import { ConcertService } from './concert.service';
import { Concert } from './schemas/concert.schema';
import { AdminGuard } from '../roles/roles.guard';

@Controller('concerts')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  async getConcerts() {
    return await this.concertService.getConcerts();
  }

  @Get(':id')
  async getConcertById(@Param('id') id: string): Promise<Concert> {
    return await this.concertService.getConcertById(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  async createConcert(@Body() concert: Concert): Promise<Concert> {
    return await this.concertService.createConcert(concert)
  }
  
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteConcert(@Param('id') id: string): Promise<Concert> {
    return await this.concertService.deleteConcert(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async updateConcert(@Param('id') id: string, @Body() concert: Concert): Promise<Concert> {
    return await this.concertService.updateConcert(id, concert);
  }
}
