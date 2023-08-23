import { IsString, IsNotEmpty, IsEmail, MinLength, IsPhoneNumber, IsPostalCode, Validate, MaxLength } from "class-validator";
import { PhoneNumberValidator } from "../phonevalidator.controller";

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

    @IsNotEmpty()
    @MaxLength(14, { message: 'Número inválido.' })
    @IsPhoneNumber('BR', { message: 'Informe um número de telefone válido.' })
    @Validate(PhoneNumberValidator, {
        message: 'Informe um número de telefone válido no formato (DDD) XXXX-XXXX.'
    })
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
