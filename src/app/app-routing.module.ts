import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)

      },
      {
        path: 'administrador',
        loadChildren: () => import('./pages/administrador/administrador.module').then(m => m.AdministradorPageModule)
      },
      {
        path: 'supervisor',
        loadChildren: () => import('./pages/supervisor/supervisor.module').then(m => m.SupervisorPageModule)
      },
      {
        path: 'encuestador/:user',
        loadChildren: () => import('./pages/encuestador/encuestador.module').then(m => m.EncuestadorPageModule)
      },
      {
        path: 'encuestas/:cedula',
        loadChildren: () => import('./pages/encuestas/encuestas.module').then(m => m.EncuestasPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
