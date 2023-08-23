import { Post, Controller, Body, ConflictException, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDTO } from './user-dtos/createuser.dto';
import { hash, genSalt } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/usuarios')
export class UsuarioController {
    constructor(private readonly prismaService: PrismaService) { }

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CreateUserDTO) {

        try {
            const existingUser = await this.prismaService.users.findUnique({
                where: { email: dadosDoUsuario.email }
            })

            if (existingUser) {
                throw new ConflictException('Este email já está sendo usado.')
            }

            const saltRounds = 10;
            const salt = await genSalt(saltRounds)

            const hashedPassword = await hash(dadosDoUsuario.password, salt)

            const novoUsuario = await this.prismaService.users.create({
                data: {
                    name: dadosDoUsuario.name,
                    email: dadosDoUsuario.email,
                    password: hashedPassword,
                    admin: dadosDoUsuario.admin || false,
                    telefone: dadosDoUsuario.telefone,
                    rua: dadosDoUsuario.rua,
                    bairro: dadosDoUsuario.bairro,
                    cidade: dadosDoUsuario.cidade,
                    cep: dadosDoUsuario.cep,
                }
            })
            return { message: 'Usuário criado com sucesso!', data: novoUsuario }
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Erro ao cadastrar um usuário!',
                    message: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
