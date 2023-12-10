import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailsComponent, UserEditComponent, UserListComponent } from '@angular-concert-project/user';
import { AboutComponent } from './pages/about/about.component';
import { ConcertListAdminComponent, ConcertDetailsComponent, ConcertEditComponent, ConcertListComponent, TicketListComponent } from '@angular-concert-project/concert';
import { LoginPageComponent } from './auth/login/login.component';
import { AuthGuard } from "@angular-concert-project/auth-ui";

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginPageComponent },

  { path: '', pathMatch: 'full', component: AboutComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: 'users', pathMatch: 'full', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'users/new', pathMatch: 'full', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', pathMatch: 'full', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'users/:id/edit', pathMatch: 'full', component: UserEditComponent, canActivate: [AuthGuard] },

  { path: 'tickets', pathMatch: 'full', component: TicketListComponent },

  { path: 'concerts', pathMatch: 'full', component: ConcertListComponent },
  { path: 'concerts/:id', pathMatch: 'full', component: ConcertDetailsComponent },

  { path: 'concerts-admin', pathMatch: 'full', component: ConcertListAdminComponent, canActivate: [AuthGuard] },
  { path: 'concerts-admin/new', pathMatch: 'full', component: ConcertEditComponent, canActivate: [AuthGuard] },
  { path: 'concerts-admin/:id/edit', pathMatch: 'full', component: ConcertEditComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
