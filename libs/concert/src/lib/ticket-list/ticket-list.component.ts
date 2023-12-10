import { Component, OnInit } from '@angular/core';

import {ConcertService, Ticket} from '@angular-concert-project/concert';

@Component({
  selector: 'angular-concert-project-concert-list-admin',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];

  constructor(private concertService: ConcertService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.concertService.getTicketsFromUser().subscribe(tickets => this.tickets = tickets);
  }

  deleteTicket(ticketId: string): void {
    this.concertService.deleteTicket(ticketId).subscribe({
      next: (response) => {
        console.log('Ticket deleted successfully', response);
        this.loadTickets();
      },
      error: (error) => {
        console.error('Failed to delete ticket', error);
      }
    });
  }
}
