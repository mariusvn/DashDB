import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './services/guards/auth-guard.service';
import {AngularFireAuthGuard, loggedIn} from '@angular/fire/auth-guard';


const routes: Routes = [
    {
        path: 'board',
        loadChildren: () => import('./board/board.module').then(m => m.BoardModule),
        canActivate: [AuthGuardService],

    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [AuthGuardService],
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'board'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
