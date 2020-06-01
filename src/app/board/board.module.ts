import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {SharedModule} from '../shared/shared.module';
import {NbMenuModule} from '@nebular/theme';


@NgModule({
  declarations: [LayoutComponent],
    imports: [
        CommonModule,
        BoardRoutingModule,
        SharedModule,
        NbMenuModule
    ]
})
export class BoardModule { }
