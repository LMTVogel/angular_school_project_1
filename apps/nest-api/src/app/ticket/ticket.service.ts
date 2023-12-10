import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConcertService } from '../concert/concert.service';
import { Concert } from '../concert/schemas/concert.schema';
import { UserService } from '../user/user.service';
import {Ticket, TicketDocument} from "./ticket.schema";

@Injectable()
export class TicketService {
    constructor(
        @InjectModel(Ticket.name)
        private ticketModel: Model<TicketDocument>,
        private readonly userService: UserService,
        private readonly concertService: ConcertService,
    ) {}

    async getTicketsFromUserId(token: string): Promise<Ticket[]> {
        const user = await this.userService.getUserById(token);
        return await this.ticketModel.find({ user: user }).populate('concert');
    }

    async createTicket(
        id: string,
        ticket: Ticket,
    ):Promise<Ticket> {
        if (!ticket.concert) throw new HttpException('Concert is required', HttpStatus.BAD_REQUEST);
        
        const concert = await this.concertService.getConcertById(String(ticket.concert));

        if (await this.isConcertSoldOut(concert)) throw new HttpException('Concert is sold out', HttpStatus.BAD_REQUEST);

        const user = await this.userService.getUserById(id);
        const newTicket = new this.ticketModel({ ...ticket, concert: concert, user: user });

        await newTicket.save().catch((err) => {
            console.log('Error: ', err.message);
            throw new HttpException('Error', HttpStatus.BAD_REQUEST);
        });

        return newTicket;
    }

    async isConcertSoldOut(concert: Concert): Promise<boolean> {
        return await this.ticketModel.countDocuments({ concert: concert }) >= concert.maxTickets;
    }

    async deleteTicket(id: string): Promise<Ticket> {
        return await this.ticketModel.findOneAndDelete({ id: id });
    }
}