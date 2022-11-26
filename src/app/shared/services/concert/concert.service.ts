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
      startDateTime: new Date('05/05/2022 20:00'),
      maxTickets: 10000,
      minimumAge: 16,
      location: {
        id: 0,
        name: 'Ziggo Dome',
        streetAddress: 'Amsterdamstraat 22',
        zipCode: '1012 AB',
        city: 'Amsterdam',
        country: 'Nederland',
      },
      artists: [
        {
          id: 0,
          name: 'Adam Lambert',
          bands: [
            {
              id: 0,
              name: 'Queen',
            },
          ],
        },
        {
          id: 1,
          name: 'Brian May',
          bands: [
            {
              id: 0,
              name: 'Queen',
            },
          ],
        },
        {
          id: 2,
          name: 'Roger Taylor',
          bands: [
            {
              id: 0,
              name: 'Queen',
            },
          ],
        }
      ],
    },
    { id: 1,
      name: 'Billy Joel',
      startDateTime: new Date('05/05/2022 20:00'),
      maxTickets: 10000,
      minimumAge: 16,
      location: {
        id: 1,
        name: 'Ziggo Dome',
        streetAddress: 'Amsterdamstraat 22',
        zipCode: '1012 AB',
        city: 'Amsterdam',
        country: 'Nederland',
      },
      artists: [
        {
          id: 3,
          name: 'Billy Joel',
          bands: [],
        },
      ],
    },
    { id: 2,
      name: 'Jon Bon Jovi',
      startDateTime: new Date('05/05/2022 20:00'),
      maxTickets: 10000,
      minimumAge: 16,
      location: {
        id: 2,
        name: 'Nieuwe Luxor Theater',
        streetAddress: 'Rotterdamseweg 185',
        zipCode: '3012 AB',
        city: 'Rotterdam',
        country: 'Nederland',
      },
      artists: [
        {
          id: 4,
          name: 'Jon Bon Jovi',
          bands: [
            {
            id: 1,
            name: 'Bon Jovi',
            }
          ],
        },
      ],
    },
    { id: 3,
      name: 'Elton John',
      startDateTime: new Date('05/05/2022 20:00'),
      maxTickets: 10000,
      minimumAge: 16,
      location: {
        id: 3,
        name: 'Ahoy Rotterdam',
        streetAddress: 'Ahoyweg 10',
        zipCode: '3012 AB',
        city: 'Rotterdam',
        country: 'Nederland',
      },
      artists: [
        {
          id: 5,
          name: 'Elton John',
          bands: [],
        },
      ],
    },
    { id: 4,
      name: 'George Michael',
      startDateTime: new Date('05/05/2022 20:00'),
      maxTickets: 10000,
      minimumAge: 16,
      location: {
        id: 0,
        name: 'Ziggo Dome',
        streetAddress: 'Amsterdamstraat 22',
        zipCode: '1012 AB',
        city: 'Amsterdam',
        country: 'Nederland',
      },
      artists: [
        {
          id: 6,
          name: 'George Michael',
          bands: [
            {
              id: 2,
              name: 'Wham!',
            },
          ],
        },
      ],
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
}
