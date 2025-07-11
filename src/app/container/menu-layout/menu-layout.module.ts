import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuLayoutPageRoutingModule } from './menu-layout-routing.module';

import { MenuLayoutPage } from './menu-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuLayoutPageRoutingModule
  ],
  declarations: [MenuLayoutPage]
})
export class MenuLayoutPageModule {}
