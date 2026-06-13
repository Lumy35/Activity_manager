import { TaskStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  IsISO8601,
} from 'class-validator';

export class CreateTasksBodyDTO {
  @IsString({ message: 'A descrição deve ser um texto válido' })
  @IsNotEmpty({ message: 'A descrição da tarefa não pode ser vazia' })
  description!: string;

  @IsEnum(TaskStatus, {
    message: 'O status deve ser BACKLOG, IN_PROGRESS, BLOCKED ou DONE',
  })
  @IsOptional()
  status?: TaskStatus;

  @IsISO8601(
    {},
    {
      message:
        'A data de entrega (dueDate) deve ser uma data válida no formato YYYY-MM-DD',
    },
  )
  @IsOptional()
  dueDate?: string;

  @IsUUID('4', { message: 'O ID do usuário deve ser um UUID válido' })
  @IsOptional()
  userId?: string;

  @IsUUID('4', { message: 'O ID da Sprint deve ser um UUID válido' })
  @IsOptional()
  sprintId?: string;
}
