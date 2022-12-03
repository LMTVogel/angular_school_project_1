import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailsComponent, UserEditComponent, UserListComponent } from '@angular-concert-project/user';
import { AboutComponent } from './pages/about/about.component';
import { ConcertListComponent, ConcertDetailsComponent, ConcertEditComponent } from '@angular-concert-project/concert';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AboutComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
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
