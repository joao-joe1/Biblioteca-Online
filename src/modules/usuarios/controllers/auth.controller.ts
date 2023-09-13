import { Post, Controller, Body, ConflictException, HttpStatus, HttpException, UsePipes, ValidationPipe, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from '../user-dtos/createuser.dto';
import { hash, genSalt, compare } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from '../user-dtos/loginDTO.dto';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

const JWT_SECRET = process.env.JWT_SECRET

@Controller('auth')
export class UsuarioController {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService
    ) { }

    @Post('/signup')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() dadosDoUsuario: CreateUserDTO) {
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

    @Post('/login')
    @UsePipes(new ValidationPipe({ transform: true }))
    async login(@Body() dadosLogin: LoginDTO) {
        const userExists = await this.prismaService.users.findFirst({
            where: { email: dadosLogin.email }
        })

        if (!userExists) {
            throw new ConflictException('Credenciais inválidas.')
        }

        const passwordCompare = await compare(dadosLogin.password, userExists.password)
        if (!passwordCompare) {
            throw new ConflictException('Credenciais inválidas.')
        }

        const token = sign({ email: userExists.email }, JWT_SECRET, {
            subject: userExists.id,
            expiresIn: '1d'
        })

        return { message: 'Autenticado com sucesso!', token }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout(@Req() request: Request, @Res() response: Response) {

        try {
            const authToken = request.headers.authorization as string
            const token = authToken.split(' ')[1]

            this.authService.logout(token)
            response.clearCookie("refreshToken")
            response.clearCookie("acessToken")
            response.json()

            return { message: 'Logout realizado com sucesso!' }
        } catch (error) {
            console.log(error)
            return { error }
        }
    }
}
