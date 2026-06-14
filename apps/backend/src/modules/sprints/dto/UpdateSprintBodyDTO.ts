import { PartialType } from '@nestjs/mapped-types';
import { CreateSprintBodyDTO } from './CreateSprintBodyDTO';

export class UpdateSprintBodyDTO extends PartialType(CreateSprintBodyDTO) {}