import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserHttpService } from '@angular-concert-project/user';
import { UserService } from "../user.service";

@Component({
  selector: 'angular-concert-project-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined = undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   this.user = this.userService.getUserById(Number(params.get('id')));
    // })
    this.route.paramMap.subscribe((params) => {
      this.user = this.userService.getUserById(params.get('id')!);
    })
  }

}
