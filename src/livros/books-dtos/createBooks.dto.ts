import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateBookDTO {
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsString()
    autor: string;

    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsNotEmpty()
    @IsString()
    genero: string;

    @IsUrl()
    capa_url: string;

    @IsNotEmpty()
    @IsNumber()
    quantidade_disponivel: number;

    @IsNotEmpty()
    @IsNumber()
    quantidade_total: number;

    @IsNotEmpty()
    @IsNumber()
    classificacao: number;
}
