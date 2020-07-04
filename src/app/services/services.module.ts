import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageService} from './page.service';
import {SocietyService} from './society.service';
import {DatabaseService} from './database.service';
import {AuthService} from './auth.service';
import {AuthGuardService} from './guards/auth-guard.service';



@NgModule({
  imports: [CommonModule],
  providers: [PageService, SocietyService]
})
export class ServicesModule { }

