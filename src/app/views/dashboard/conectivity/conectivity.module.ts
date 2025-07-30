import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConectivityPageRoutingModule } from './conectivity-routing.module';

import { ConectivityPage } from './conectivity.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConectivityPageRoutingModule,
    TranslateModule
  ],
  declarations: [ConectivityPage]
})
export class ConectivityPageModule {}
