import { Artist } from "./artist.model";
import { EventLocation } from "./event-location.model";

export interface Concert {
    id: number;
    name: string;
    startDateTime: Date;
    maxTickets: number;
    minimumAge: number;
    location: EventLocation;
    artists: Artist[];
}
