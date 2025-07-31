import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },  {
    path: 'conectivity',
    loadChildren: () => import('./conectivity/conectivity.module').then( m => m.ConectivityPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'speakers',
    loadChildren: () => import('./speakers/speakers.module').then( m => m.SpeakersPageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'tour',
    loadChildren: () => import('./tour/tour.module').then( m => m.TourPageModule)
  },
  {
    path: 'recomendations',
    loadChildren: () => import('./recomendations/recomendations.module').then( m => m.RecomendationsPageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then( m => m.MapsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
