import { IsNotEmpty, IsString } from 'class-validator';

export class EmprestimoDTO {
    @IsNotEmpty({ message: 'BookNameNotProvidedError' })
    @IsString({ message: 'InvalidBookNameTypeError' })
    nomeLivro: string;

    @IsNotEmpty({ message: 'StudentCodeNotProvidedError' })
    @IsString({ message: 'InvalidStudentCodeTypeError' })
    alunoCode: number;
}
