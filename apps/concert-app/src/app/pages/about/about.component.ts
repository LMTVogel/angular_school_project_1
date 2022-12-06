import { Component, OnInit } from '@angular/core';
import {User, UserHttpService} from '@angular-concert-project/user';

@Component({
  selector: 'angular-concert-project-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
