import { IsString, IsNotEmpty, IsEmail, MinLength, IsBoolean, MaxLength, IsPhoneNumber, IsPostalCode, Validate, } from "class-validator";
import { PhoneNumberValidator } from "../controllers/phonevalidator.controller";

export class CreateUserDTO {
    // Nome do usuário (mínimo de 3 caracteres, por exemplo)
    @IsString()
    @IsNotEmpty({ message: 'O campo nome não pode estar vazio.' })
    @MinLength(3, { message: 'O campo nome deve ter no mínimo 3 caracteres.' })
    name: string;

    // Endereço de e-mail do usuário
    @IsEmail({}, { message: 'Informe um endereço de email válido.' })
    @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
    email: string;

    // Senha do usuário (mínimo de 6 caracteres)
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    password: string;

    // Indicador de administração do usuário
    @IsBoolean()
    admin: boolean = false;

    // Número de telefone do usuário
    @IsNotEmpty()
    @MaxLength(14, { message: 'Número inválido.' })
    @IsPhoneNumber('BR', { message: 'Informe um número de telefone válido.' })
    @Validate(PhoneNumberValidator, {
        message: 'Informe um número de telefone válido no formato (DDD) XXXX-XXXX.'
    })
    telefone: string;

    // Rua do endereço do usuário
    @IsString()
    rua: string;

    // Bairro do endereço do usuário
    @IsString()
    bairro: string;

    // Cidade do endereço do usuário
    @IsString()
    cidade: string;

    // CEP do endereço do usuário
    @IsPostalCode('BR', { message: 'Informe um CEP válido.' })
    @IsNotEmpty({ message: 'O campo CEP não pode estar vazio.' })
    cep: string;
}
