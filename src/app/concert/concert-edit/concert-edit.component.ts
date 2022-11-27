import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Concert } from '../../shared/models/concert.model';
import { ConcertService } from '../../shared/services/concert/concert.service';

@Component({
  selector: 'app-concert-edit',
  templateUrl: './concert-edit.component.html',
  styleUrls: ['./concert-edit.component.scss']
})
export class ConcertEditComponent implements OnInit {
  concert: Concert | undefined = undefined;
  isEditting: boolean = false;

  constructor(
    private concertService: ConcertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');

      if(id) {
        this.isEditting = true;
        this.concert = this.concertService.getConcertById(Number(id));
      } else {
        this.isEditting = false;
        this.concert = {
          id: 0,
          name: '',
          startDate: new Date(),
          maxTickets: 0,
          minimumAge: 0,
        };
      }
    })
  }

  onSubmit(concertForm: NgForm): void {
    if(this.isEditting) {
      let editConcert = {
        ...concertForm.value,
        startDate: new Date(concertForm.value.startDate),
      }
      this.concertService.editConcert(editConcert);
    } else {
      let newConcert = {
        id: this.concertService.getConcerts().length,
        ...concertForm.value,
        startDate: new Date(concertForm.value.startDate),
      };
      this.concertService.addConcert(newConcert);
      console.log(newConcert);
    }

    this.router.navigate(['concerts']);
  }

}
