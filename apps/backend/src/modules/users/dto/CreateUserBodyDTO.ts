import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserBodyDTO {
  @IsString({ message: 'O nome deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @Length(3, 50, { message: 'O nome deve ter entre 3 e 50 caracteres' })
  name!: string;

  @IsString({ message: 'O cargo deve ser um texto válido' })
  @IsNotEmpty({ message: 'O cargo não pode ser vazio' })
  @Length(2, 30, { message: 'O cargo deve ter entre 2 e 30 caracteres' })
  role!: string;
}
