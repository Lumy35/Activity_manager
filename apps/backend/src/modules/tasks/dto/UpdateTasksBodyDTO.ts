import { PartialType } from '@nestjs/mapped-types';
import { CreateTasksBodyDTO } from './CreateTasksBodyDTO';

export class UpdateTasksBodyDTO extends PartialType(CreateTasksBodyDTO) {}
