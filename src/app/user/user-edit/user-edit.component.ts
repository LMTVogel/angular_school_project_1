import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User | undefined = undefined;
  isEditting: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');

      if(id) {
        this.isEditting = true;
        this.user = this.userService.getUserById(Number(id));
      } else {
        this.isEditting = false;
        this.user = {
          id: 0,
          name: '',
          email: '',
          bday: new Date(),
        };
      }
    })
  }

  onSubmit(userForm: NgForm): void {
    if(this.isEditting) {
      let editUser = {
        ...userForm.value,
        bday: new Date(userForm.value.bday),
      }
      this.userService.editUser(editUser);
    } else {
      let newUser = {
        id: this.userService.getUsers().length,
        ...userForm.value,
        bday: new Date(userForm.value.bday),
      };
      this.userService.addUser(newUser);
    }

    this.router.navigate(['users']);
  }
}
