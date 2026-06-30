import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(taskDto: TaskDto) {
    this.tasks.push(taskDto);
    console.log(this.tasks);
  }

  findById(id: string) {
    const foundTask = this.tasks.filter((t) => t.id === id);

    if (foundTask.length) {
      return foundTask[0];
    }
    throw new NotFoundException(`Task with id: ${id} not found`);
  }

  update(id: string, task: TaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex !== -1) {
      this.tasks[taskIndex] = { ...task, id };
      return this.tasks[taskIndex];
    }

    throw new NotFoundException(`Task with id: ${id} not found`);
  }
}
