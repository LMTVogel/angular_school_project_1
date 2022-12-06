import { Component, OnInit } from '@angular/core';

import { User, UserHttpService } from '@angular-concert-project/user';

@Component({
  selector: 'angular-concert-project-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userHttpService: UserHttpService) { }

  ngOnInit(): void {
    this.userHttpService.getAll().subscribe(users => this.users = users);

    console.log(this.users);
  }

  deleteUser(id: string): void {
    throw new Error('Method not implemented.');
  }
}
