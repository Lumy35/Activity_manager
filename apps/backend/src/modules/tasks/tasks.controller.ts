import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksBodyDTO } from './dto/CreateTasksBodyDTO';
import { UpdateTasksBodyDTO } from './dto/UpdateTasksBodyDTO';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTasksBodyDTO: CreateTasksBodyDTO) {
    return this.tasksService.create(createTasksBodyDTO);
  }

  @Get()
  findMany(@Query('sprintId') sprintId?: string) {
    return this.tasksService.findMany(sprintId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTasksBodyDTO: UpdateTasksBodyDTO,
  ) {
    return this.tasksService.update(id, updateTasksBodyDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
