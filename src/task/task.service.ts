import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(taskDto: TaskDto) {
    this.tasks.push(taskDto);
    console.log(this.tasks);
  }

  findById(id: string) {
    const foundTask = this.tasks.find((t) => t.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return foundTask;
  }

  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter((t) => {
      let match = true;

      if (params.title != undefined && !t.title.includes(params.title)) {
        match = false;
      }

      if (params.status != undefined && !t.status.includes(params.status)) {
        match = false;
      }

      return match;
    });
  }

  update(id: string, task: TaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    const updatedTask = { ...task, id };
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    this.tasks.splice(taskIndex, 1);
  }
}
