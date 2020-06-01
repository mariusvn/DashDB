import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbButtonModule, NbLayoutModule, NbSidebarModule} from '@nebular/theme';
import {ServicesModule} from '../services/services.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    ServicesModule
  ],
  exports: [
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    ServicesModule
  ]
})
export class SharedModule { }
