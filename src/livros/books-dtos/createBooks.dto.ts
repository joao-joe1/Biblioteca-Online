import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateBookDTO {
    @IsNotEmpty({ message: "O título não pode estar vazio." })
    @IsString({ message: "O título deve ser uma string." })
    titulo: string;

    @IsNotEmpty({ message: "O autor não pode estar vazio." })
    @IsString({ message: "O autor deve ser uma string." })
    autor: string;

    @IsNotEmpty({ message: "A descrição não pode estar vazia." })
    @IsString({ message: "A descrição deve ser uma string." })
    descricao: string;

    @IsNotEmpty({ message: "O gênero não pode estar vazio." })
    @IsString({ message: "O gênero deve ser uma string." })
    genero: string;

    @IsUrl({}, { message: "A URL da capa não é válida." })
    @IsNotEmpty({ message: "A URL da capa não pode estar vazia." })
    capa_url: string;

    @IsNotEmpty({ message: "A quantidade disponível não pode estar vazia." })
    @IsNumber({}, { message: "A quantidade disponível deve ser um número." })
    quantidade_disponivel: number;

    @IsNotEmpty({ message: "A quantidade total não pode estar vazia." })
    @IsNumber({}, { message: "A quantidade total deve ser um número." })
    quantidade_total: number;

    @IsNotEmpty({ message: "A classificação não pode estar vazia." })
    @IsNumber({}, { message: "A classificação deve ser um número." })
    classificacao: number;
}
