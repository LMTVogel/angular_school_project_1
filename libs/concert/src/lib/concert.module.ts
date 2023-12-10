import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcertDetailsComponent } from './concert-details/concert-details.component';
import { ConcertEditComponent } from './concert-edit/concert-edit.component';
import { ConcertListAdminComponent } from './concert-list-admin/concert-list-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConcertListComponent } from "./concert-list/concert-list.component";
import {TicketListComponent} from "./ticket-list/ticket-list.component";

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  declarations: [ConcertDetailsComponent, ConcertEditComponent, ConcertListAdminComponent, ConcertListComponent, TicketListComponent],
})
export class ConcertModule {}
