import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NumeroEncuestasPageRoutingModule } from './numero-encuestas-routing.module';

import { NumeroEncuestasPage } from './numero-encuestas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NumeroEncuestasPageRoutingModule
  ],
  declarations: [NumeroEncuestasPage]
})
export class NumeroEncuestasPageModule {}
