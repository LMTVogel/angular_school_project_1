import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

<<<<<<< HEAD:libs/user/src/lib/user/user-details/user-details.component.ts
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user/user.service';
=======
import { User, UserService } from '@angular-concert-project/user';
>>>>>>> nx:libs/user/src/lib/user-details/user-details.component.ts

@Component({
  selector: 'angular-concert-project-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined = undefined;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.user = this.userService.getUserById(Number(params.get('id')));
    })
  }

}
