import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateSprintBodyDTO } from './dto/CreateSprintBodyDTO';
import { UpdateSprintBodyDTO } from './dto/UpdateSprintBodyDTO';

@Injectable()
export class SprintsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSprintDto: CreateSprintBodyDTO) {
    return this.prisma.sprint.create({
      data: {
        description: createSprintDto.description,
        startDate: new Date(createSprintDto.startDate),
        endDate: new Date(createSprintDto.endDate),
      },
    });
  }

  async findMany() {
    return this.prisma.sprint.findMany({
      orderBy: {
        startDate: 'desc',
      },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const sprint = await this.prisma.sprint.findUnique({
      where: { id },
      include: {
        tasks: true,
      },
    });

    if (!sprint) {
      throw new NotFoundException(`Sprint com ID "${id}" não encontrada`);
    }

    return sprint;
  }

  async update(id: string, updateSprintDto: UpdateSprintBodyDTO) {
    await this.findOne(id);

    const dataUpdate: any = { ...updateSprintDto };

    if (updateSprintDto.startDate)
      dataUpdate.startDate = new Date(updateSprintDto.startDate);
    if (updateSprintDto.endDate)
      dataUpdate.endDate = new Date(updateSprintDto.endDate);

    return this.prisma.sprint.update({
      where: { id },
      data: dataUpdate,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.sprint.delete({
      where: { id },
    });
  }
}
