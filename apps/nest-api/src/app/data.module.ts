import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { User, UserSchema } from "./user/user.schema";
import { Concert, ConcertSchema } from "./concert/schemas/concert.schema";
import {ConcertController} from "./concert/concert.controller";
import {ConcertService} from "./concert/concert.service";
import { TicketController } from "./ticket/ticket.controller";
import { TicketService } from "./ticket/ticket.service";
import { Ticket, TicketSchema } from "./ticket/ticket.schema";
import { Identity, IdentitySchema } from "./auth/identity.schema";
import { AuthService } from "./auth/auth.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Identity.name, schema: IdentitySchema },
            { name: User.name, schema: UserSchema },
            { name: Concert.name, schema: ConcertSchema },
            { name: Ticket.name, schema: TicketSchema },
        ]),
    ],
    controllers: [
        UserController,
        ConcertController,
        TicketController
    ],
    providers: [
        AuthService,
        UserService,
        ConcertService,
        TicketService
    ],
    exports: [
        UserService,
        ConcertService,
        TicketService
    ],
})

export class DataModule {}
