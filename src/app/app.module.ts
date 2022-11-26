import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { ConcertEditComponent } from './concert/concert-edit/concert-edit.component';
import { ConcertListComponent } from './concert/concert-list/concert-list.component';
import { ConcertDetailsComponent } from './concert/concert-details/concert-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserEditComponent,
    UserDetailsComponent,
    NavComponent,
    FooterComponent,
    AboutComponent,
    ConcertEditComponent,
    ConcertListComponent,
    ConcertDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
