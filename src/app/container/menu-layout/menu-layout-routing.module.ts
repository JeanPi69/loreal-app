import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuLayoutPage } from './menu-layout.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MenuLayoutPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../../views/dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuLayoutPageRoutingModule {}
