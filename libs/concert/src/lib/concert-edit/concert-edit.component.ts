import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Concert, ConcertService } from '@angular-concert-project/concert';

@Component({
  selector: 'angular-concert-project-concert-edit',
  templateUrl: './concert-edit.component.html',
  styleUrls: ['./concert-edit.component.scss']
})
export class ConcertEditComponent implements OnInit {
  concert: Concert | undefined = undefined;
  isEditing = false;

  constructor(
    private concertService: ConcertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if(id) {
        this.isEditing = true;
        this.concert = this.concertService.getConcertById(Number(id));
      } else {
        this.isEditing = false;
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
    if(this.isEditing) {
      const editConcert = {
        ...concertForm.value,
        startDate: new Date(concertForm.value.startDate),
      }
      this.concertService.editConcert(editConcert);
    } else {
      const newConcert = {
        ...concertForm.value,
        startDate: new Date(concertForm.value.startDate),
      };
      this.concertService.addConcert(newConcert);
      console.log(newConcert);
    }

    this.router.navigate(['concerts']);
  }

}
