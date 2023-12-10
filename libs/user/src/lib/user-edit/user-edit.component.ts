import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '@angular-concert-project/user';
import { UserService } from "../user.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'angular-concert-project-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User | undefined = undefined;
  bdayString: string | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');

      if (userId) {
        this.userService.getUserById(userId).subscribe(user => {
          this.user = user;
          this.bdayString = this.formatDate(user.bday);
        });
      } else {
        console.error('No user ID was provided.')
      }
    });
  }

  formatDate(date: Date): string {
    // Convert the Date object to a string in 'YYYY-MM-DD' format so that Chrome understands what to do with it
    return date.toISOString().substring(0, 10);
  }

  onSubmit(userForm: NgForm): void {
    if (this.user && this.bdayString) {
      this.user.bday = new Date(this.bdayString);
      this.userService.updateUser(this.user).subscribe({
        next: () => this.router.navigate(['users']),
        error: (err) => {
          console.error('There was an error!', err);
        }
      });
    } else {
      console.error('No user was provided.');
    }
  }
}
