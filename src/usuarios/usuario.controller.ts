/* eslint-disable prettier/prettier */
import { Post, Controller, Body, ConflictException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDTO } from './user-dtos/createuser.dto';

const prisma = new PrismaClient();

@Controller('/usuarios')
export class UsuarioController {

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CreateUserDTO) {

        try {
            const existingUser = await prisma.users.findUnique({
                where: { email: dadosDoUsuario.email }
            })

            if (existingUser) {
                throw new ConflictException('Este email já está sendo usado.')
            }

            const novoUsuario = await prisma.users.create({
                data: {
                    name: dadosDoUsuario.name,
                    email: dadosDoUsuario.email,
                    password: dadosDoUsuario.password,
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
            return { message: 'Erro ao cadastrar um usuário!', error: error }
        }
    }
}
