import { Component, OnInit } from '@angular/core';

import { User } from '@angular-concert-project/user';
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
    // this.userService.getAllUsers().subscribe(users => this.users = users);

    // console.log(this.users);
    this.users = this.userService.getAllUsers();
  }

  deleteUser(id: string): void {
    throw new Error('Method not implemented.');
  }
}
