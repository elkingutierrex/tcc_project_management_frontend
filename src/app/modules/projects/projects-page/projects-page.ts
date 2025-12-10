import { Component, inject } from '@angular/core';
import { ProjectsStoreService } from '../../../core/services/projects-store.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectForm } from '../project-form/project-form';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { ProjectItem } from './project-item/project-item';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, ProjectItem],
  templateUrl: './projects-page.html',
  styleUrls: ['./projects-page.scss'],
})
export class ProjectsPage {
  dialog = inject(MatDialog);
  projectsStore = inject(ProjectsStoreService);
  http = inject(HttpClient);
  httpHandler = this.http;

  projects = this.projectsStore.projects;

  ngOnInit() {
    this.projectsStore.loadProjects();
    alert("Projects Page Loaded");
    console.log('project page');

  }

  openCreateProject() {
    this.dialog.open(ProjectForm);
  }
}
