import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PROJECT_ROUTES } from './modules/projects/routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: 'projects',
    children: PROJECT_ROUTES,
  },
  // Rutas fallback
  {
    path: '**',
    redirectTo: 'projects',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
