import { Component, OnInit } from '@angular/core';

import { ConcertService, Concert } from '@angular-concert-project/concert';

@Component({
  selector: 'angular-concert-project-concert-list-admin',
  templateUrl: './concert-list-admin.component.html',
  styleUrls: ['./concert-list-admin.component.scss']
})
export class ConcertListAdminComponent implements OnInit {
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
        this.loadConcerts();
      }, error => {
        console.error('Error deleting concert', error);
      });
    }
  }
}
