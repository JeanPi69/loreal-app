import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendationsByCategoryPage } from './recommendations-by-category.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendationsByCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendationsByCategoryPageRoutingModule {}
