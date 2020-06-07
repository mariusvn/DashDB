import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {NbToggleModule} from '@nebular/theme';
import {SSRExcludeModule} from 'ngx-ssr-exclude';

@NgModule({
  imports: [
    AppModule,
    ServerModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
