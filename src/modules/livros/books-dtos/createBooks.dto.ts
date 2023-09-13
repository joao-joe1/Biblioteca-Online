import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateBookDTO {
    @IsNotEmpty({ message: "TitleNotProvidedError" })
    @IsString({ message: "InvalidTitleTypeError" })
    titulo: string;

    @IsNotEmpty({ message: "AuthorNotProvidedError" })
    @IsString({ message: "InvalidAuthorTypeError" })
    autor: string;

    @IsNotEmpty({ message: "DescriptionNotProvidedError" })
    @IsString({ message: "InvalidDescriptionTypeError" })
    descricao: string;

    @IsNotEmpty({ message: "GenreNotProvidedError" })
    @IsString({ message: "InvalidGenreTypeError" })
    genero: string;

    @IsUrl({}, { message: "InvalidCoverUrlError" })
    @IsNotEmpty({ message: "CoverUrlNotProvidedError" })
    capa_url: string;

    @IsNotEmpty({ message: "QuantityNotProvidedError" })
    @IsNumber({}, { message: "InvalidQuantityTypeError" })
    quantidade_disponivel: number;

    @IsNotEmpty({ message: "TotalQuantityNotProvidedError" })
    @IsNumber({}, { message: "InvalidTotalQuantityTypeError" })
    quantidade_total: number;

    @IsNotEmpty({ message: "RatingNotProvidedError" })
    @IsNumber({}, { message: "InvalidRatingTypeError" })
    classificacao: number;
}
