import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbButtonModule, NbInputModule, NbLayoutModule, NbSidebarModule, NbSpinnerModule} from '@nebular/theme';
import {ServicesModule} from '../services/services.module';
import {PageEditorComponent} from './page-editor.component';
import {CompanyEditorComponent} from './company-editor.component';
import {UsersEditorComponent} from './users-editor.component';
import {SensitiveInfoComponent} from './sensitive-info.component';



@NgModule({
  declarations: [PageEditorComponent, CompanyEditorComponent, UsersEditorComponent, SensitiveInfoComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    ServicesModule,
    NbSpinnerModule,
    NbInputModule
  ],
  exports: [
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    ServicesModule,
    PageEditorComponent,
    UsersEditorComponent,
    CompanyEditorComponent
  ]
})
export class SharedModule { }
