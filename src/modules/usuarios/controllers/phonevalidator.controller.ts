import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'PhoneNumber', async: false })
export class PhoneNumberValidator implements ValidatorConstraintInterface {
    validate(telefone: string, args: ValidationArguments) {
        // Remove parênteses, espaço e hífen antes da validação
        const telefoneLimpo = telefone.replace(/[()\s-]/g, '');

        // Verifique o formato do número de telefone
        const telefonePattern = /^\d{11}$/; // 11 dígitos após a limpeza
        return telefonePattern.test(telefoneLimpo);
    }

    defaultMessage(args: ValidationArguments) {
        return 'Informe um número de telefone válido no formato (DDD) XXXX-XXXX.';
    }
}
