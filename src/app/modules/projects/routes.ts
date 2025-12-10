import { Routes } from '@angular/router';

import { ProjectsPage } from './projects-page/projects-page';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    component: ProjectsPage,
    children: [
      {
        path: '',
        loadComponent: () => import('./projects-page/projects-page').then((m) => m.ProjectsPage),
      },
    ],
  },
];
