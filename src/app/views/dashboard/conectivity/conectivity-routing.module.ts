import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConectivityPage } from './conectivity.page';

const routes: Routes = [
  {
    path: '',
    component: ConectivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConectivityPageRoutingModule {}
