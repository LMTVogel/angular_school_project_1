import { Injectable } from '@angular/core';

import { Concert } from '@angular-concert-project/concert';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  private url = 'https://angularschoolproject1-production.up.railway.app/api/concerts';
  // private url = 'http://localhost:3333/api/concerts';
  //
  // concerts: Concert[] = [
  //   { id: 0,
  //     name: 'Queen + Adam Lambert',
  //     startDate: new Date('05/05/2022'),
  //     maxTickets: 10000,
  //     minimumAge: 16,
  //   },
  //   { id: 1,
  //     name: 'Billy Joel',
  //     startDate: new Date('05/05/2022'),
  //     maxTickets: 10000,
  //     minimumAge: 16,
  //   },
  //   { id: 2,
  //     name: 'Jon Bon Jovi',
  //     startDate: new Date('05/05/2022'),
  //     maxTickets: 10000,
  //     minimumAge: 16,
  //   },
  //   { id: 3,
  //     name: 'Elton John',
  //     startDate: new Date('05/05/2022'),
  //     maxTickets: 10000,
  //     minimumAge: 16,
  //   },
  //   { id: 4,
  //     name: 'George Michael',
  //     startDate: new Date('05/05/2022'),
  //     maxTickets: 10000,
  //     minimumAge: 16,
  //   },
  // ];

  constructor(private httpClient: HttpClient) { }

  getAllConcerts(): Observable<Concert[]> {
    return this.httpClient.get<Concert[]>(this.url).pipe(
      map(concerts => concerts.map(concert => ({
        ...concert,
        // Convert the startDate string to a Date object
        startDate: new Date(concert.startDate)
      })))
    );
  }

  getConcertById(id: string): Observable<Concert> {
    return this.httpClient.get<Concert>(this.url + '/' + id).pipe(
      map(concert => ({
        ...concert,
        // Convert the startDate string to a Date object
        startDate: new Date(concert.startDate)
      }))
    );
  }

  addConcert(concert: Concert): Observable<Concert> {
    return this.httpClient.post<Concert>(this.url, concert);
  }

  editConcert(concert: Concert): Observable<Concert> {
    return this.httpClient.put<Concert>(this.url, concert);
  }

  deleteConcert(id: string): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
