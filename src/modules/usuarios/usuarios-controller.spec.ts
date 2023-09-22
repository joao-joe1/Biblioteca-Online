import { PrismaService } from "src/prisma/prisma.service";
import { UsuarioController } from "./controllers/auth.controller"
import { AuthService } from "./services/auth.service"

describe('AuthController', () => {
    let usuarioController: UsuarioController;
    let authService: AuthService;
    let prismaService: PrismaService;

    beforeEach(() => {
        authService = new AuthService();
        prismaService = new PrismaService();
        usuarioController = new UsuarioController(prismaService, authService)
    })
})

it('deve cadastrar um novo usuário com dados válidos', async () => {

});

it('deve retornar erro ao tentar cadastrar um usuário com email já em uso', async () => {

});

it('deve retornar erro ao tentar cadastrar um usuário com dados inválidos', async () => {

});

it('deve autenticar um usuário com credenciais válidas', async () => {

});

it('deve retornar erro ao tentar autenticar um usuário com email que não existe', async () => {

});

it('deve retornar erro ao tentar autenticar um usuário com senha incorreta', async () => {

});

it('deve realizar o logout de um usuário autenticado', async () => {

});

it('deve retornar erro ao tentar realizar o logout sem token válido', async () => {

});