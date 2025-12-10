import { Component, inject } from '@angular/core';
import { ProjectsStoreService } from '../../../core/services/projects-store.service';
import { MatDialog } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { ProjectItem } from './project-item/project-item';
import { CreateProjectTaskDialog } from '../../../shared/components/create-project-task-dialog/create-project-task-dialog';


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
    console.log('project page');

  }


  openCreateProject( type: 'Create Project' | 'Add Task' ) {
    const data = { type : type}
    this.dialog.open(CreateProjectTaskDialog, {data: data }  );
  }
}
