import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user/user.service';
import * as fromComponents from '.';

@NgModule({
  imports: [CommonModule, NgModule],
  declarations: [...fromComponents.components],
})
export class SharedModule {}
