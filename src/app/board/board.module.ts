import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {SharedModule} from '../shared/shared.module';
import {NbCardModule, NbInputModule, NbMenuModule, NbToggleModule, NbWindowModule} from '@nebular/theme';
import {TableViewComponent} from './table-view/table-view.component';
import {HomeViewComponent} from './home-view/home-view.component';
import {EditDialogComponent} from './dialogs/edit-dialog/edit-dialog.component';
import {SSRExcludeModule} from 'ngx-ssr-exclude';


@NgModule({
  declarations: [LayoutComponent, TableViewComponent, HomeViewComponent, EditDialogComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    NbMenuModule,
    NbCardModule,
    NbWindowModule.forChild(),
    NbInputModule,
    NbToggleModule,
    SSRExcludeModule,
    SharedModule
  ]
})
export class BoardModule { }
