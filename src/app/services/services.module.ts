import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageService} from './page.service';
import {SocietyService} from './society.service';
import {DatabaseService} from './database.service';



@NgModule({
  imports: [CommonModule],
  providers: [PageService, SocietyService, DatabaseService]
})
export class ServicesModule { }
