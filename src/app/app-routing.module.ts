import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AboutComponent } from './about/about.component';
import { ConcertListComponent } from './concert/concert-list/concert-list.component';
import { ConcertDetailsComponent } from './concert/concert-details/concert-details.component';
import { ConcertEditComponent } from './concert/concert-edit/concert-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AboutComponent },
  { path: 'users', pathMatch: 'full', component: UserListComponent },
  { path: 'users/new', pathMatch: 'full', component: UserEditComponent },
  { path: 'users/:id', pathMatch: 'full', component: UserDetailsComponent },
  { path: 'users/:id/edit', pathMatch: 'full', component: UserEditComponent },

  { path: 'concerts', pathMatch: 'full', component: ConcertListComponent },
  { path: 'concerts/new', pathMatch: 'full', component: ConcertEditComponent },
  { path: 'concerts/:id', pathMatch: 'full', component: ConcertDetailsComponent },
  { path: 'concerts/:id/edit', pathMatch: 'full', component: ConcertEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
