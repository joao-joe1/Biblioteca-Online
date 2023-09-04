import { Controller, Body, Post, ConflictException } from "@nestjs/common";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { PrismaService } from "src/prisma/prisma.service";

interface IAuthRequest {
    email: string,
    password: string
}

const JWT_SECRET = process.env.JWT_SECRET

@Controller('/login')
export class AuthenticateUsuarioController {
    constructor(private readonly prismaService: PrismaService) { }
    @Post()
    async authUsuario(@Body() dadosDoUsuario: IAuthRequest) {

        const userExists = await this.prismaService.users.findFirst({
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