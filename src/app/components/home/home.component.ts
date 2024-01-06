import { Component, computed, effect, signal } from '@angular/core';
import { FilterType, TaskModel } from '../../models/Task';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasksList = signal<TaskModel[]>(
    [
      {
        id: 1,
        title: 'Task 1',
        completed: false,
        description: 'Description 1',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Task 2',
        completed: false,
        description: 'Description 2',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Task 3',
        completed: false,
        description: 'Description 3',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: 'Task 4',
        completed: true,
        description: 'Description 4',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        title: 'Task 5',
        completed: false,
        description: 'Description 5',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  );
  filter = signal<FilterType>('all');

  tasksfiltered = computed(() => {
    const tasks = this.tasksList();
    const filter = this.filter();
    switch(filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  });

  newTask = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)
    ]
  });

  // constructor
  constructor() {
    effect(() => {
      localStorage.setItem('tasks', JSON.stringify(this.tasksList()));
    });
  }

  ngOnInit(): void {
    const storage = localStorage.getItem('tasks');
    if(storage) {
      this.tasksList.set(JSON.parse(storage));
    }
  }


  changeFilter(filter: FilterType) {
    this.filter.set(filter);
  }

  addTask() {
    const task: TaskModel = {
      id: Math.floor(Math.random() * 100),
      title: this.newTask.value,
      completed: false,
      description: '',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    if(this.newTask.valid && this.newTask.value !== '') {
      this.tasksList.update(
        (tasks) => [...tasks, task]
      );
      this.newTask.reset();
    }else{
      alert('El campo no puede estar vacio');
    }
  }
  toggleTask(id: number) {
    this.tasksList.update(
      (tasks) => tasks.map((task) => {
        if(task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      })
    );
  }
  deleteTask(id: number) {
    this.tasksList.update(
      (tasks) => tasks.filter((task) => task.id !== id)
    );
  }
  editTask(id: number) {
    this.tasksList.update(
      (tasks) => tasks.map((task) => {
        if(task.id === id) {
          task.editing = !task.editing;
        }
        return task;
      })
    );
  }
  saveUpdateTask(id: number, event: Event) {
    this.tasksList.update(
      (tasks) => tasks.map((task) => {
        if(task.id === id) {
          task.title = (event.target as HTMLInputElement).value;
          task.editing = false;
        }
        return task;
      })
    );
  }
}
