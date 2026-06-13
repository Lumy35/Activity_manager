import { IsNotEmpty, IsString, IsISO8601 } from 'class-validator';

export class CreateSprintBodyDTO {
  @IsString({ message: 'A descrição deve ser um texto válido' })
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  description!: string;

  @IsISO8601(
    {},
    {
      message:
        'A data de início deve ser uma data válida no formato YYYY-MM-DD',
    },
  )
  @IsNotEmpty({ message: 'A data de início é obrigatória' })
  startDate!: string;

  @IsISO8601(
    {},
    {
      message:
        'A data de término deve ser uma data válida no formato YYYY-MM-DD',
    },
  )
  @IsNotEmpty({ message: 'A data de término é obrigatória' })
  endDate!: string;
}
