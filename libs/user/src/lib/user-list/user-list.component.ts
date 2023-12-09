import { Component, OnInit } from '@angular/core';

import { User } from '../user.model';
import {UserService} from "../user.service";

@Component({
  selector: 'angular-concert-project-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }

  deleteUser(id: string): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe(() => {
        // After the user is successfully deleted, refresh the list of users.
        this.loadUsers();
      }, error => {
        // Handle any errors here.
        console.error('Error deleting user', error);
      });
    }
  }
}
