import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendationsByCategoryPageRoutingModule } from './recommendations-by-category-routing.module';

import { RecommendationsByCategoryPage } from './recommendations-by-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendationsByCategoryPageRoutingModule
  ],
  declarations: [RecommendationsByCategoryPage]
})
export class RecommendationsByCategoryPageModule {}
