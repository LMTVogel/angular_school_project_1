import { Injectable } from '@angular/core';

import {Concert, Ticket} from '@angular-concert-project/concert';
import {map, Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  private concertUrl = 'https://angularschoolproject1-production.up.railway.app/api/concerts';
  // private concertUrl = 'http://localhost:3333/api/concerts';

  // private ticketUrl = 'https://angularschoolproject1-production.up.railway.app/api/tickets';
  private ticketUrl = 'http://localhost:3333/api/tickets';

  constructor(private httpClient: HttpClient) { }

  getAllConcerts(): Observable<Concert[]> {
    return this.httpClient.get<Concert[]>(this.concertUrl).pipe(
      map(concerts => concerts.map(concert => ({
        ...concert,
        // Convert the startDate string to a Date object
        startDate: new Date(concert.startDate)
      })))
    );
  }

  getConcertById(id: string): Observable<Concert> {
    return this.httpClient.get<Concert>(this.concertUrl + '/' + id).pipe(
      map(concert => ({
        ...concert,
        // Convert the startDate string to a Date object
        startDate: new Date(concert.startDate)
      }))
    );
  }

  addConcert(concert: Concert): Observable<Concert> {
    return this.httpClient.post<Concert>(this.concertUrl, concert);
  }

  editConcert(concert: Concert): Observable<Concert> {
    return this.httpClient.put<Concert>(this.concertUrl, concert);
  }

  deleteConcert(id: string): Observable<any> {
    return this.httpClient.delete(this.concertUrl + '/' + id);
  }

  reserveTicket(ticket: Ticket): Observable<any> {
    return this.httpClient.post(this.ticketUrl, ticket);
  }

  getTicketsFromUser(): Observable<any> {
    return this.httpClient.get<any>(this.ticketUrl);
  }

  deleteTicket(ticketId: string): Observable<any> {
    return this.httpClient.delete(this.ticketUrl + '/' + ticketId);
  }
}
