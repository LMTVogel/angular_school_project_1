import { Injectable } from '@angular/core';

import { UserRole, User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [
    { id: 0,
      name: 'John Doe',
      email: 'johndoe@mail.com',
      role: UserRole.admin,
    },
    { id: 1,
      name: 'Bert Doe',
      email: 'bertdoe@mail.com',
      role: UserRole.guest,
    },
    { id: 2,
      name: 'Gert Arends',
      email: 'gert@mail.com',
      role: UserRole.guest,
    },
    { id: 3,
      name: 'Pietje Puk',
      email: 'pietje@mail.com',
      role: UserRole.guest,
    },
  ];

  constructor() { }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    return this.users.filter((user) => user.id === id)[0];
  }

  editUser(id: number): void {
    
  }

  deleteUser(id: number): void {
    let userToDelete = this.users.findIndex((user) => user.id === id);
    this.users.splice(userToDelete, 1);
  }

}
