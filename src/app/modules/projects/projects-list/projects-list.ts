import { Component, inject } from '@angular/core';
import { ProjectsStoreService } from '../../../core/services/projects-store.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './projects-list.html',
  styleUrls: ['./projects-list.scss'],
})
export class ProjectsList {
  projectsStore = inject(ProjectsStoreService);
  projects = this.projectsStore.projects;

  ngOnInit() {
    this.projectsStore.loadProjects();
  }
}
