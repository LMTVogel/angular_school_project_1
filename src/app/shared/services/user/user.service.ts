import { Injectable } from '@angular/core';

import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [
    { id: 0,
      name: 'John Doe',
      email: 'johndoe@mail.com',
      bday: new Date('05/05/1990'),
    },
    { id: 1,
      name: 'Bert Doe',
      email: 'bertdoe@mail.com',
      bday: new Date('05/05/1990'),
    },
    { id: 2,
      name: 'Gert Arends',
      email: 'gert@mail.com',
      bday: new Date('05/05/1990'),
    },
    { id: 3,
      name: 'Pietje Puk',
      email: 'pietje@mail.com',
      bday: new Date('05/05/1990'),
    },
    { id: 4,
      name: 'Klaas Vaak',
      email: 'klaas@mail.com',
      bday: new Date('05/05/1990'),
    },
  ];

  constructor() { }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    return this.users.filter((user) => user.id === id)[0];
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  editUser(user: User): void {
    let userToEdit = this.users.findIndex((u) => u.id === user.id);
    this.users[userToEdit] = user;
  }

  deleteUser(id: number): void {
    let userToDelete = this.users.findIndex((user) => user.id === id);
    this.users.splice(userToDelete, 1);
  }
}
