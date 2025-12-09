import { Component, inject } from '@angular/core';
import { ProjectsStoreService } from '../../../core/services/projects-store.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectStatus } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-form.html',
})
export class ProjectForm {
  dialogRef = inject(MatDialogRef<ProjectForm>);
  projectsStore = inject(ProjectsStoreService);

  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    startDate: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    status: new FormControl<ProjectStatus>('CREATED', { nonNullable: true }),
  });

  async save() {
    if (this.form.invalid) return;
    const result = await this.projectsStore.createProject(this.form.getRawValue());
    if (result) this.dialogRef.close(result);
  }
}
