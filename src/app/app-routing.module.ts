import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
    {
        path: 'board',
        loadChildren: () => import('./board/board.module').then(m => m.BoardModule)
    },
    {
        path: 'auth',
        // TODO add auth
        // loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
        redirectTo: 'board'
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'board'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
