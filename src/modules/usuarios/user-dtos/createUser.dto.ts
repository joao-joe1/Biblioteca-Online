import { IsString, IsNotEmpty, IsEmail, MinLength, IsBoolean, MaxLength, IsPhoneNumber, IsPostalCode, Validate, Matches, Length, IsStrongPassword, IsNumber, } from "class-validator";
import { PhoneNumberValidator } from "../controllers/phonevalidator.controller";

export class CreateUserDTO {
    @IsNotEmpty({ message: 'NameNotProvidedError' })
    @IsString({ message: "InvalidUsernameTypeError" })
    @Length(3, 20, { message: "InvalidUsernameLengthError" })
    @Matches(/^[a-zA-Z0-9_]{3,20}$/, { message: 'InvalidUsernameFormatError' })
    name: string;

    @IsEmail({}, { message: 'InvalidEmailError' })
    @IsNotEmpty({ message: 'EmailNotProvidedError' })
    email: string;

    @IsNotEmpty({ message: 'NameNotProvidedError' })
    // @IsStrongPassword({}, { message: "PasswordNotStrongEnoughError" })s
    @Length(6, 70, { message: "InvalidPasswordLengthError" })
    password: string;

    @IsBoolean({ message: 'InvalidAdminError' })
    admin: boolean = false;

    @IsNotEmpty({ message: 'TelefoneNotProvidedError' })
    @MaxLength(15, { message: 'InvalidPhoneNumberError' })
    @IsPhoneNumber('BR', { message: 'InvalidPhoneNumberFormatError' })
    @Validate(PhoneNumberValidator, {
        message: 'InvalidPhoneNumberFormatError'
    })
    telefone: string;

    @IsNotEmpty({ message: 'EmailNotProvidedError' })
    @IsString({ message: "InvalidUsernameTypeError" })
    rua: string;

    @IsNotEmpty({ message: 'EmailNotProvidedError' })
    @IsString({ message: "InvalidUsernameTypeError" })
    bairro: string;

    @IsNotEmpty({ message: 'EmailNotProvidedError' })
    @IsString({ message: "InvalidUsernameTypeError" })
    cidade: string;

    @IsPostalCode('BR', { message: 'InvalidCepError' })
    @IsNotEmpty({ message: 'CepNotProvidedError' })
    cep: string;
}
