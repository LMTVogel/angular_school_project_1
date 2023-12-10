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
    this.loadConcerts();
  }

  loadConcerts(): void {
    this.concertService.getAllConcerts().subscribe(concerts => this.concerts = concerts);
  }

  deleteConcert(id: string): void {
    if (confirm("Are you sure you want to delete this concert?")) {
      this.concertService.deleteConcert(id).subscribe(() => {
        // After the concert is successfully deleted, refresh the list of concerts.
        this.loadConcerts();
      }, error => {
        // Handle any errors here.
        console.error('Error deleting concert', error);
      });
    }
  }
}
