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
} from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { CreateSprintBodyDTO } from './dto/CreateSprintBodyDTO';
import { UpdateSprintBodyDTO } from './dto/UpdateSprintBodyDTO';

@Controller('sprints')
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSprintDto: CreateSprintBodyDTO) {
    return this.sprintsService.create(createSprintDto);
  }

  @Get()
  findMany() {
    return this.sprintsService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sprintsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSprintDto: UpdateSprintBodyDTO,
  ) {
    return this.sprintsService.update(id, updateSprintDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.sprintsService.remove(id);
  }
}
