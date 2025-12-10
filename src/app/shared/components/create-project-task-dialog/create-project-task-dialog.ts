import { Component, inject, Input } from '@angular/core';
import { ProjectsStoreService } from '../../../core/services/projects-store.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProjectStatus } from '../../../core/models/project.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

interface CreateProjectTaskDialogData {
  type: 'Create Project' | 'Add Task';
  projectId?: number; // Solo necesario para 'CreateTask' para asociar la tarea al proyecto correspondiente por su ID
  }

@Component({
  selector: 'app-create-project-task-dialog',
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
  templateUrl: './create-project-task-dialog.html',
})
export class CreateProjectTaskDialog {
  dialogRef = inject(MatDialogRef<CreateProjectTaskDialog>);
  data: CreateProjectTaskDialogData = inject(MAT_DIALOG_DATA);
  projectsStore = inject(ProjectsStoreService);
  nameTitle :string = '';
  dateTile :string = '';


  ngOnInit(): void {
    if(this.data.type === 'Create Project'){
      this.nameTitle = 'Project Name';
      this.dateTile = 'Start Date';
    }else{
      this.nameTitle = 'Task Title';
      this.dateTile = 'Due Date';
    }
  }



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
