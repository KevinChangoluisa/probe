import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorPage } from './supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorPage
  },
  {
    path: 'numero-encuestas',
    loadChildren: () => import('./numero-encuestas/numero-encuestas.module').then( m => m.NumeroEncuestasPageModule)
  },
  {
    path: 'reporte',
    loadChildren: () => import('./reporte/reporte.module').then( m => m.ReportePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorPageRoutingModule {}
