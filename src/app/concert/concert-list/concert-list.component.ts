import { Component, OnInit } from '@angular/core';

import { ConcertService } from 'src/app/shared/services/concert/concert.service';
import { Concert } from '../../../app/shared/models/concert.model';

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.scss']
})
export class ConcertListComponent implements OnInit {
  concerts: Concert[] = [];

  constructor(private concertService: ConcertService) { }

  ngOnInit(): void {
    this.concerts = this.concertService.getConcerts();
  }

  deleteConcert(id: number): void {
    this.concertService.deleteConcert(id);
  }
}
