import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    NbThemeModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbWindowModule,
    NbToastrModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {SSRExcludeModule} from 'ngx-ssr-exclude';
import {AuthGuardService} from './services/guards/auth-guard.service';
import {AuthService} from './services/auth.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'dark' }),
        NbLayoutModule,
        NbMenuModule.forRoot(),
        NbEvaIconsModule,
        NbSidebarModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        SSRExcludeModule
    ],
    providers: [AuthService, AuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
