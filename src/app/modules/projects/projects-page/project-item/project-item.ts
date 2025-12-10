import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TasksStoreService } from '../../../../core/services/tasks-store.service';
import { Project } from '../../../../core/models/project.model';
import { TaskStatus, Task } from '../../../../core/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectTaskDialog } from '../../../../shared/components/create-project-task-dialog/create-project-task-dialog';



@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './project-item.html',
  styleUrls: ['./project-item.scss']
})
export class ProjectItem {
  dialog = inject(MatDialog);
  @Input({ required: true }) project!: Project;

  private tasksStore = inject(TasksStoreService);

  tasks = signal<Task[]>([]);
  loading = this.tasksStore.loading;

  async ngOnInit() {
    const list = await this.tasksStore.loadTasks(this.project.id!);
    this.tasks.set(list);
  }

  async changeStatus(task: Task, status: TaskStatus) {
    const updated = await this.tasksStore.updateStatus(task.id, status);

    this.tasks.update(t =>
      t.map(x => x.id === updated.id ? updated : x)
    );
  }

async createTask(type: 'Create Project' | 'Add Task') {

  const dialogRef = this.dialog.open(CreateProjectTaskDialog, {
  data: {
      type,                   // ✔ Tipo de operación
      projectId: this.project.id // ✔ ID del proyecto actual
    }
  });

  dialogRef.afterClosed().subscribe(async result => {
    if (!result) return;

    console.log(result);


    const created = await this.tasksStore.createTask(this.project.id!, {
      title: result.name,
      description: result.description,
      status: result.status,
      dueDate: result.startDate
    });

    this.tasks.update(list => [created, ...list]);
  });
}
}
