import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    SharedModule
  ]
})
export class BoardModule { }
