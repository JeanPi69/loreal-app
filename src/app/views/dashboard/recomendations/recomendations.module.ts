import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecomendationsPageRoutingModule } from './recomendations-routing.module';

import { RecomendationsPage } from './recomendations.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecomendationsPageRoutingModule,
    TranslateModule
  ],
  declarations: [RecomendationsPage]
})
export class RecomendationsPageModule {}
