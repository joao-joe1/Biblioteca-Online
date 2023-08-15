/* eslint-disable prettier/prettier */
import { Post, Controller, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('/usuarios')
export class UsuarioController {

    @Post()
    async criaUsuario(@Body() dadosDoUsuario) {
        try {
            const novoUsuario = await prisma.users.create({
                data: {
                    name: dadosDoUsuario.name,
                    email: dadosDoUsuario.email,
                    password: dadosDoUsuario.password,
                    admin: dadosDoUsuario.admin || false
                }
            })

            return { message: 'Usuário criado com sucesso!', data: novoUsuario }
        } catch (error) {
            return { message: 'Erro ao cadastrar um usuário!', error: error }
        }
    }
}
