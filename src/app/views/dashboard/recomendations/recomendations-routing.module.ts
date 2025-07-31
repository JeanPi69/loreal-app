import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomendationsPage } from './recomendations.page';

const routes: Routes = [
  {
    path: '',
    component: RecomendationsPage
  },  {
    path: 'recommendations-by-category',
    loadChildren: () => import('./recommendations-by-category/recommendations-by-category.module').then( m => m.RecommendationsByCategoryPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecomendationsPageRoutingModule {}
