import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserBodyDTO } from './dto/CreateUserBodyDTO';
import { UpdateUserBodyDTO } from './dto/UpdateUserBodyDTO';
import { PrismaService } from 'src/repository/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserBodyDTO) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findMany() {
    return this.prisma.user.findMany({
      include: {
        _count: {
          select: { tasks: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserBodyDTO) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
