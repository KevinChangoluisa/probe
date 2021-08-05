import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NumeroEncuestasPage } from './numero-encuestas.page';

const routes: Routes = [
  {
    path: '',
    component: NumeroEncuestasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumeroEncuestasPageRoutingModule {}
