import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {SharedModule} from '../shared/shared.module';
import {
  NbCardModule,
  NbInputModule,
  NbMenuModule,
  NbSpinnerModule, NbTabsetModule,
  NbToggleModule,
  NbWindowModule
} from '@nebular/theme';
import {TableViewComponent} from './table-view/table-view.component';
import {HomeViewComponent} from './home-view/home-view.component';
import {EditDialogComponent} from './dialogs/edit-dialog/edit-dialog.component';
import {SSRExcludeModule} from 'ngx-ssr-exclude';
import {AdminDialogComponent} from './dialogs/admin-dialog/admin-dialog.component';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    LayoutComponent,
    TableViewComponent,
    HomeViewComponent,
    EditDialogComponent,
    AdminDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    NbMenuModule,
    NbCardModule,
    NbWindowModule.forChild(),
    NbInputModule,
    NbToggleModule,
    SSRExcludeModule,
    SharedModule,
    NbSpinnerModule,
    NbTabsetModule,
    FormsModule
  ]
})
export class BoardModule { }
