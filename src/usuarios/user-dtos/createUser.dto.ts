import { IsString, IsNotEmpty, IsEmail, MinLength, IsPhoneNumber, IsPostalCode } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @IsNotEmpty({ message: 'O campo nome não pode estar vazio.' })
    name: string;

    @IsEmail({}, { message: 'Informe um endereço de email válido.' })
    @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
    email: string;

    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    password: string;

    admin: boolean = false

    @IsPhoneNumber('BR', { message: 'Informe um número de telefone válido.' })
    telefone: string

    @IsString()
    rua: string;

    @IsString()
    bairro: string;

    @IsString()
    cidade: string;

    @IsPostalCode('BR', { message: 'Informe um CEP válido.' })
    @IsNotEmpty({ message: 'O campo CEP não pode estar vazio.' })
    cep: string;
}
