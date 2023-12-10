import {User, UserCredentials, UserService} from '@angular-concert-project/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@angular-concert-project/auth-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-concert-project-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user!: UserCredentials;
  wrongLogin = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
    };
  }

  onSubmit(): void {
    console.log('Login form submitted');
    this.authService.login(this.user).subscribe((result: any | undefined) => {
      if (result.error) {
        console.log(result.error)
        this.wrongLogin = true;
      } else {
        console.log('User login successful');
        this.wrongLogin = false;
        localStorage.setItem('token', JSON.stringify(result.token) || '');

        this.authService.updateAuthStatus();

        this.userService.checkAdminStatus().subscribe({
          next: (isAdmin) => {
          },
          error: (error) => {
            console.error('Failed to fetch admin status: ', error);
          }
        });

        this.router.navigate(['']);
      }
    });
  }

  // onSubmit(): void {
  //   console.log('Login form submitted');
  //   this.authService.login(this.user).subscribe({
  //     next: (token) => {
  //       console.log('User login successful');
  //       this.wrongLogin = false;
  //       localStorage.setItem('token', JSON.stringify(token));
  //
  //       // After login, get the admin status
  //       this.userService.isUserAdmin().subscribe({
  //         next: (isAdmin) => {
  //           localStorage.setItem('isAdmin', String(isAdmin));
  //           // Update auth status and navigate to the home page or admin dashboard based on the admin status
  //           this.authService.updateAuthStatus();
  //           this.router.navigate(['']);
  //         },
  //         error: (error) => {
  //           console.error('Failed to fetch admin status: ', error);
  //         }
  //       });
  //     },
  //     error: (error) => {
  //       console.error('An error occurred: ' + error);
  //       this.wrongLogin = true;
  //       // Handle the login error, possibly by showing an error message to the user
  //     }
  //   });
  // }

}
