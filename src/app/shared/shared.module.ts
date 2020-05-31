import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbButtonModule, NbLayoutModule, NbSidebarModule} from '@nebular/theme';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule
  ],
  exports: [
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule
  ]
})
export class SharedModule { }
