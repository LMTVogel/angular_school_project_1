import {
    Body,
    Controller, Delete, Get, Param, Post,
} from '@nestjs/common';
import { Token, InjectToken } from '../auth/token.decorator';
import { Ticket } from './ticket.schema';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Get()
    async getTicketsFromUserId(@InjectToken() token: Token): Promise<Ticket[]> {
        return await this.ticketService.getTicketsFromUserId(token.id);
    }

    @Post()
    async createTicket(@InjectToken() token: Token, @Body() ticket: Ticket): Promise<Ticket> {
        return await this.ticketService.createTicket(token.id, ticket)
    }

    @Delete(':id')
    async deleteTicket(@Param('id') id: string): Promise<Ticket> {
        return await this.ticketService.deleteTicket(id);
    }
}