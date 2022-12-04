import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [UserEditComponent, UserListComponent, UserDetailsComponent],
})
export class UserModule {}
