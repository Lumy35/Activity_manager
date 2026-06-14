import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBodyDTO } from './CreateUserBodyDTO';

export class UpdateUserBodyDTO extends PartialType(CreateUserBodyDTO) {}
