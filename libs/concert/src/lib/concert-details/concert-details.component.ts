import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Concert, ConcertService, Ticket} from '@angular-concert-project/concert';

@Component({
  selector: 'angular-concert-project-concert-details',
  templateUrl: './concert-details.component.html',
  styleUrls: ['./concert-details.component.scss']
})
export class ConcertDetailsComponent implements OnInit {
  concert: Concert | undefined = undefined;

  constructor(
    private concertService: ConcertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const concertId = params.get('id');

      if (concertId) {
        this.concertService.getConcertById(concertId).subscribe((concert: Concert) => {
          this.concert = concert;
        });
      } else {
        console.error('No concert ID was provided.')
      }
    });
  }

  reserveTicket(): void {
    if (!this.concert) {
      console.error('Concert data is not available');
      return;
    }

    const ticket: Ticket = {
      price: 20,
      concert: this.concert.id
    };

    this.concertService.reserveTicket(ticket).subscribe({
      next: (response) => {
        console.log('Ticket reserved successfully', response);
        this.router.navigate(['/tickets']);
      },
      error: (error) => {
        console.error('Failed to reserve ticket', error);
      }
    });
  }
}
