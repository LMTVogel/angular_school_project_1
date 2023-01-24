import { UserCredentials } from '@angular-concert-project/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@angular-concert-project/auth-ui';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'angular-concert-project-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user!: UserCredentials;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
    };
  }

  onSubmit(): void {
    this.authService.login(this.user).subscribe((token: Token) => {
      if (token) {
        console.log("Login successful");
        localStorage.setItem("token", JSON.stringify(token) || '');
        this.userService.getSelf.subscribe((user) => {
          console.log(user);
          localStorage.setItem("user", JSON.stringify(user) || '');
          localStorage.setItem("token", JSON.stringify(token) || '');
      });
      this.authService.loginStatus = true;
      this.router.navigate(['']);
  }
}