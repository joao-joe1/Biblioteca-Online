import { PrismaClient } from "@prisma/client";
import { Controller, Body, Post, ConflictException } from "@nestjs/common";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

interface IAuthRequest {
    email: string,
    password: string
}

const JWT_SECRET = process.env.JWT_SECRET

@Controller('/login')
export class AuthenticateUsuarioController {

    @Post()
    async authUsuario(@Body() dadosDoUsuario: IAuthRequest) {

        const userExists = await prisma.users.findUnique({
            where: {
                email: dadosDoUsuario.email
            }
        })
        if (!userExists) {
            throw new ConflictException('Credenciais inválidas.')
        }

        const passwordCompare = await compare(dadosDoUsuario.password, userExists.password)
        if (!passwordCompare) {
            throw new ConflictException("Credenciais inválidas.")
        }

        const token = sign({ email: userExists.email }, JWT_SECRET, {
            subject: userExists.id,
            expiresIn: '1d'
        })

        return { message: 'YAY! Autenticação bem sucedida!', token: token };
    }
}