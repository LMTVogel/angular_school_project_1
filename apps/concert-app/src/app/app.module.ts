import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './pages/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './auth/login/login.component';
import { LoginComponent } from '@angular-concert-project/auth-ui';
import { httpInterceptorProviders } from "@angular-concert-project/auth-ui";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    AboutComponent,
    LoginPageComponent,
    LoginComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
