import { Component, inject } from '@angular/core';
import { ProjectsStoreService } from '../../../core/services/projects-store.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectForm } from '../project-form/project-form';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './projects-page.html',
  styleUrls: ['./projects-page.scss'],
})
export class ProjectsPage {
  dialog = inject(MatDialog);
  projectsStore = inject(ProjectsStoreService);

  projects = this.projectsStore.projects;

  ngOnInit() {
    this.projectsStore.loadProjects();
  }

  openCreateProject() {
    this.dialog.open(ProjectForm);
  }
}
