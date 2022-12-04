import { Component, OnInit } from '@angular/core';

<<<<<<< HEAD:libs/user/src/lib/user/user-list/user-list.component.ts
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user/user.service';
=======
import { User, UserService } from '@angular-concert-project/user';
>>>>>>> nx:libs/user/src/lib/user-list/user-list.component.ts

@Component({
  selector: 'angular-concert-project-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }
}
