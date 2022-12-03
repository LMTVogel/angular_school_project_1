import { Component, OnInit } from '@angular/core';

import { ConcertService, Concert } from '@angular-concert-project/concert';

@Component({
  selector: 'angular-concert-project-concert-list',
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
