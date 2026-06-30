import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(taskDto: TaskDto) {
    this.tasks.push(taskDto);
    console.log(this.tasks);
  }
}
