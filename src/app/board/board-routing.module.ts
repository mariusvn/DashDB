import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {TableViewComponent} from './table-view/table-view.component';
import {HomeViewComponent} from './home-view/home-view.component';


const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeViewComponent,
        outlet: 'sub'
      }
    ],
    pathMatch: 'full'
  },
  {
    path: ':boardId',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: TableViewComponent,
        outlet: 'sub'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
