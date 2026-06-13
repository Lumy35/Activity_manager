import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateTasksBodyDTO } from './dto/CreateTasksBodyDTO';
import { TaskStatus } from '@prisma/client';
import { UpdateTasksBodyDTO } from './dto/UpdateTasksBodyDTO';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTasksBodyDTO) {
    if (dto.sprintId) await this.validateSprint(dto.sprintId);
    if (dto.userId) await this.validateUser(dto.userId);

    return this.prisma.task.create({
      data: {
        description: dto.description,
        status: dto.status ? dto.status : TaskStatus.BACKLOG,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        userId: dto.userId || null,
        sprintId: dto.sprintId || null,
        completedAt: dto.status === TaskStatus.DONE ? new Date() : null,
      },
    });
  }

  async findMany(sprintId?: string) {
    return this.prisma.task.findMany({
      where: {
        ...(sprintId ? { sprintId } : {}),
      },
      include: {
        user: { select: { id: true, name: true } },
        sprint: { select: { id: true, description: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { user: true, sprint: true },
    });

    if (!task) {
      throw new NotFoundException(`Tarefa com ID "${id}" não encontrada`);
    }
    return task;
  }

  async update(id: string, dto: UpdateTasksBodyDTO) {
    const currentTask = await this.findOne(id);

    if (dto.sprintId) await this.validateSprint(dto.sprintId);
    if (dto.userId) await this.validateUser(dto.userId);

    const dataUpdate: any = { ...dto };

    if (dto.dueDate) dataUpdate.dueDate = new Date(dto.dueDate);

    if (dto.status) {
      if (
        dto.status === TaskStatus.DONE &&
        currentTask.status !== TaskStatus.DONE
      ) {
        dataUpdate.completedAt = new Date(); // Finalizou agora
      } else if (
        dto.status !== TaskStatus.DONE &&
        currentTask.status === TaskStatus.DONE
      ) {
        dataUpdate.completedAt = null; // Reabriu a tarefa
      }
    }

    return this.prisma.task.update({
      where: { id },
      data: dataUpdate,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.task.delete({ where: { id } });
  }

  private async validateSprint(sprintId: string) {
    const exists = await this.prisma.sprint.findUnique({
      where: { id: sprintId },
    });
    if (!exists)
      throw new NotFoundException(`Sprint com ID "${sprintId}" não encontrada`);
  }

  private async validateUser(userId: string) {
    const exists = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!exists)
      throw new NotFoundException(`Usuário com ID "${userId}" não encontrado`);
  }
}
