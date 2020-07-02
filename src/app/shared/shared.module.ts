import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAccordionModule,
  NbButtonModule, NbCardModule, NbCheckboxModule,
  NbInputModule,
  NbLayoutModule, NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule, NbTooltipModule
} from '@nebular/theme';
import {ServicesModule} from '../services/services.module';
import {PageEditorComponent} from './page-editor.component';
import {CompanyEditorComponent} from './company-editor.component';
import {UsersEditorComponent} from './users-editor.component';
import {SensitiveInfoComponent} from './sensitive-info.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [PageEditorComponent, CompanyEditorComponent, UsersEditorComponent, SensitiveInfoComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    ServicesModule,
    NbSpinnerModule,
    NbInputModule,
    NbAccordionModule,
    NbSelectModule,
    NbCardModule,
    NbCheckboxModule,
    NbTooltipModule,
    FormsModule
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
