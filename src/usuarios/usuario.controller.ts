/* eslint-disable prettier/prettier */
import { Post, Controller, Body, ConflictException, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDTO } from './user-dtos/createuser.dto';
import { hash, genSalt } from 'bcryptjs';

@Controller('/usuarios')
export class UsuarioController {
    constructor(private readonly prisma: PrismaClient) { }

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CreateUserDTO) {

        try {
            const existingUser = await this.prisma.users.findUnique({
                where: { email: dadosDoUsuario.email }
            })

            if (existingUser) {
                throw new ConflictException('Este email já está sendo usado.')
            }

            const saltRounds = 10;
            const salt = await genSalt(saltRounds)

            const hashedPassword = await hash(dadosDoUsuario.password, salt)

            const novoUsuario = await this.prisma.users.create({
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
