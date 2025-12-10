import { Component, inject } from '@angular/core';
import { ProjectsStoreService } from '../../../core/services/projects-store.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProjectStatus } from '../../../core/models/project.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-project-form',
  standalone: true,
imports: [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatGridListModule,
  ReactiveFormsModule
],
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
