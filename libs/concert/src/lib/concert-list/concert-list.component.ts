import { Component, OnInit } from '@angular/core';

import { ConcertService, Concert } from '@angular-concert-project/concert';

@Component({
  selector: 'angular-concert-project-concert-list-admin',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.scss']
})
export class ConcertListComponent implements OnInit {
  concerts: Concert[] = [];

  constructor(private concertService: ConcertService) { }

  ngOnInit(): void {
    this.loadConcerts();
  }

  loadConcerts(): void {
    this.concertService.getAllConcerts().subscribe(concerts => this.concerts = concerts);
  }
}
