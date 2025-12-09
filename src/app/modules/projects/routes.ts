import { Routes } from '@angular/router';

import { ProjectsPage } from './projects-page/projects-page';


export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    component: ProjectsPage,
    children: [
      {
        path: '',
        loadComponent: () => import('./projects-page/projects-page').then((m) => m.ProjectsPage)
      },
      {
        path: 'create',
        loadComponent: () => import('./project-create/project-create').then((m) => m.ProjectCreate)
      },
      {
        path: ':id',
        loadComponent: () => import('./project-detail/project-detail').then((m) => m.ProjectDetail)
      },

    ],
  },

];
