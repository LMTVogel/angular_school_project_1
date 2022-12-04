import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';
import { Injectable } from '@angular/core';

import { Concert } from '../../models/concert.model';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  concerts: Concert[] = [
    { id: 0,
      name: 'Queen + Adam Lambert',
      startDate: new Date('05/05/2022'),
      maxTickets: 10000,
      minimumAge: 16,
    },
    { id: 1,
      name: 'Billy Joel',
      startDate: new Date('05/05/2022'),
      maxTickets: 10000,
      minimumAge: 16,
    },
    { id: 2,
      name: 'Jon Bon Jovi',
      startDate: new Date('05/05/2022'),
      maxTickets: 10000,
      minimumAge: 16,
    },
    { id: 3,
      name: 'Elton John',
      startDate: new Date('05/05/2022'),
      maxTickets: 10000,
      minimumAge: 16,
    },
    { id: 4,
      name: 'George Michael',
      startDate: new Date('05/05/2022'),
      maxTickets: 10000,
      minimumAge: 16,
    },
  ];

  constructor() { }

  getConcerts(): Concert[] {
    return this.concerts;
  }

  getConcertById(id: number): Concert {
    return this.concerts.filter((concert) => concert.id === id)[0];
  }

  addConcert(concert: Concert): void {
    this.concerts.push(concert);
  }

  editConcert(concert: Concert): void {
    let concertToEdit = this.concerts.findIndex((c) => c.id === concert.id);
    this.concerts[concertToEdit] = concert;
  }

  deleteConcert(id: number): void {
    let concertToDelete = this.concerts.findIndex((concert) => concert.id === id);
    this.concerts.splice(concertToDelete, 1);
  }
}
