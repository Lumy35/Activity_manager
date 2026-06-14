import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './repository/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './modules/users/users.service';
import { UsersController } from './modules/users/users.controller';
import { SprintsController } from './modules/sprints/sprints.controller';
import { TasksController } from './modules/tasks/tasks.controller';
import { SprintsService } from './modules/sprints/sprints.service';
import { TasksService } from './modules/tasks/tasks.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    SprintsController,
    TasksController,
  ],
  providers: [
    AppService,
    PrismaService,
    UsersService,
    SprintsService,
    TasksService,
  ],
})
export class AppModule {}
