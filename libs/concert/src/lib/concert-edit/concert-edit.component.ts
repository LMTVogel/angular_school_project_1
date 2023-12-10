import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import {Artist, ConcertService} from '@angular-concert-project/concert';

@Component({
  selector: 'angular-concert-project-concert-edit',
  templateUrl: './concert-edit.component.html',
  styleUrls: ['./concert-edit.component.scss']
})
export class ConcertEditComponent implements OnInit {
  concertForm: FormGroup;
  startDateString: string | undefined;
  isEditing = false;

  constructor(
    private concertService: ConcertService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.concertForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      startDate: [''],
      maxTickets: [''],
      minimumAge: [''],
      artists: this.fb.array([]),
      location: this.fb.group({
        name: [''],
        streetAddress: [''],
        zipCode: [''],
        city: [''],
        country: ['']
      })
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.isEditing = true;
        this.concertService.getConcertById(id).subscribe((concert) => {
          this.startDateString = this.formatDate(concert.startDate);
          // We fill the form, but use the string for the date so Chrome can understand it. Just as we've done in the user edit component.
          this.concertForm.patchValue({
            ...concert,
            startDate: this.startDateString
          });
          this.setArtists(concert.artists);
        });
      } else {
        this.isEditing = false;
        this.concertForm.reset();
      }
    });
  }

  get artists(): FormArray {
    return this.concertForm.get('artists') as FormArray;
  }

  private setArtists(artists: Artist[]): void {
    this.artists.clear();
    artists.forEach((artist) => {
      this.artists.push(this.fb.group({
        name: artist.name,
        band: this.fb.group({
          name: artist.band.name
        })
      }));
    });
  }

  addArtist(): void {
    this.artists.push(this.fb.group({
      name: '',
      band: this.fb.group({
        name: ''
      })
    }));
  }

  removeArtist(index: number): void {
    this.artists.removeAt(index);
  }

  formatDate(date: Date): string {
    // Convert the Date object to a string in 'YYYY-MM-DD' format so that Chrome understands what to do with it.
    return date.toISOString().substring(0, 10);
  }

  onSubmit(): void {
    if (this.concertForm.valid) {
      const formValue = { ...this.concertForm.value };

      // We are converting the string back to a Date object so that the API can understand it.
      if (this.startDateString) {
        formValue.startDate = new Date(formValue.startDate);
      }

      if (this.isEditing) {
        // Update the concert.
        this.concertService.editConcert(formValue).subscribe(() => {
          this.router.navigate(['concerts']);
        });
      } else {
        // Add a new concert
        delete formValue.id; // We don't want to send the ID to the API, because it will generate a new one in the API itself.
        this.concertService.addConcert(formValue).subscribe(() => {
          this.router.navigate(['concerts']);
        });
      }
    }
  }
}
