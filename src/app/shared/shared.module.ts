import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAccordionModule,
  NbButtonModule, NbCardModule, NbCheckboxModule,
  NbInputModule,
  NbLayoutModule, NbListModule, NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule, NbTooltipModule
} from '@nebular/theme';
import {ServicesModule} from '../services/services.module';
import {PageEditorComponent} from './page-editor.component';
import {CompanyEditorComponent} from './company-editor.component';
import {UsersEditorComponent} from './users-editor.component';
import {SensitiveInfoComponent} from './sensitive-info.component';
import {FormsModule} from '@angular/forms';
import { CreateUserComponent } from './create-user.component';



@NgModule({
  declarations: [PageEditorComponent, CompanyEditorComponent, UsersEditorComponent, SensitiveInfoComponent, CreateUserComponent],
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
    FormsModule,
    NbListModule
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
