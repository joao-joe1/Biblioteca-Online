import { IsNotEmpty, IsString } from 'class-validator';

export class EmprestimoDTO {
    @IsNotEmpty({ message: 'O nome do livro não pode estar vazio.' })
    @IsString({ message: 'O nome do livro deve ser uma string.' })
    nomeLivro: string;

    @IsNotEmpty({ message: 'O código do aluno não pode estar vazio.' })
    @IsString({ message: 'O código do aluno deve ser uma string.' })
    alunoCode: number;
}
