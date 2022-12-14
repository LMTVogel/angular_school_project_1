import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserHttpService } from '@angular-concert-project/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'angular-concert-project-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User | undefined = undefined;
  isEditting: boolean = false;

  constructor(
    private userHttpService: UserHttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   let id = params.get('id');

    //   if(id) {
    //     this.isEditting = true;
    //     this.user = this.userService.getUserById(Number(id));
    //   } else {
    //     this.isEditting = false;
    //     this.user = {
    //       id: 0,
    //       name: '',
    //       email: '',
    //       bday: new Date(),
    //     };
    //   }
    // })
  }

  // onSubmit(userForm: NgForm): void {
  //   if(this.isEditting) {
  //     let editUser = {
  //       ...userForm.value,
  //       bday: new Date(userForm.value.bday),
  //     }
  //     this.userService.editUser(editUser);
  //   } else {
  //     let newUser = {
  //       id: this.userService.getUsers().length,
  //       ...userForm.value,
  //       bday: new Date(userForm.value.bday),
  //     };
  //     this.userService.addUser(newUser);
  //   }

  //   this.router.navigate(['users']);
  // }
}
