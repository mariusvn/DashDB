import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {SharedModule} from '../shared/shared.module';
import {NbMenuModule} from '@nebular/theme';
import {TableViewComponent} from './table-view/table-view.component';
import {HomeViewComponent} from './home-view/home-view.component';


@NgModule({
  declarations: [LayoutComponent, TableViewComponent, HomeViewComponent],
  imports: [
      CommonModule,
      BoardRoutingModule,
      SharedModule,
      NbMenuModule
  ]
})
export class BoardModule { }
