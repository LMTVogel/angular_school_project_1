import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

<<<<<<< HEAD:libs/user/src/lib/user/user-edit/user-edit.component.ts
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user/user.service';
=======
import { User, UserService } from '@angular-concert-project/user';
import { NgForm } from '@angular/forms';
>>>>>>> nx:libs/user/src/lib/user-edit/user-edit.component.ts

@Component({
  selector: 'angular-concert-project-user-edit',
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
