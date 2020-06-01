import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageService} from './page.service';
import {SocietyService} from './society.service';



@NgModule({
  imports: [CommonModule],
  providers: [PageService, SocietyService]
})
export class ServicesModule { }
