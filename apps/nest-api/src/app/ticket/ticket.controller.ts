import {
    Body,
    Controller, Get, Post,
} from '@nestjs/common';
import { Token, InjectToken } from '../auth/token.decorator';
import { Ticket } from './ticket.schema';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Get()
    async getTicketsFromUserId(@InjectToken() token: Token) {
        return await this.ticketService.getTicketsFromUserId(token.id);
    }

    @Post()
    async createTicket(@InjectToken() token: Token, @Body() ticket: Ticket): Promise<Ticket> {
        return await this.ticketService.createTicket(token.id, ticket)
    }
}