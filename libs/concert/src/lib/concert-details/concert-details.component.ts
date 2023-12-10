import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Concert, ConcertService } from '@angular-concert-project/concert';

@Component({
  selector: 'angular-concert-project-concert-details',
  templateUrl: './concert-details.component.html',
  styleUrls: ['./concert-details.component.scss']
})
export class ConcertDetailsComponent implements OnInit {
  concert: Concert | undefined = undefined;

  constructor(private concertService: ConcertService, private route: ActivatedRoute) { }

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

}
