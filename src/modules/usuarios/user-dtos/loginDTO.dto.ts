import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
    @IsEmail({}, { message: 'InvalidEmailError' })
    @IsNotEmpty({ message: 'EmailNotProvidedError' })
    email: string;

    @IsNotEmpty({ message: 'PasswordNotProvidedError' })
    password: string;
}
