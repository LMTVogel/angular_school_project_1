import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcertDetailsComponent } from './concert-details/concert-details.component';
import { ConcertEditComponent } from './concert-edit/concert-edit.component';
import { ConcertListComponent } from './concert-list/concert-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  declarations: [ConcertDetailsComponent, ConcertEditComponent, ConcertListComponent],
})
export class ConcertModule {}
