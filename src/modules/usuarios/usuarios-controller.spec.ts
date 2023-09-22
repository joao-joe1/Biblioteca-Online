import { UsuarioController } from "./controllers/auth.controller"
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "./services/auth.service"

describe('AuthController', () => {
    let usuarioController: UsuarioController;
    let prismaService: PrismaService;
    let authService: AuthService;

    beforeEach(() => {
        prismaService = new PrismaService();
        authService = new AuthService();
        usuarioController = new UsuarioController(prismaService, authService)
    })

    afterAll(async () => {
        await prismaService.$disconnect();
    })

    it('deve autenticar um usuário com credenciais válidas', async () => {

        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            cep: '35179-000',
            cidade: 'ipatinga',
            bairro: 'bom pastor',
            rua: 'morango',
            telefone: '31986876109',
        }

        const createUser = await prismaService.users.create({
            data: userData
        })

        expect(createUser).toBeTruthy()

        const loginUser = {
            email: userData.email,
            password: userData.password
        }

        const result = await usuarioController.login(loginUser)

        expect(result).toBeTruthy()
        expect(result.message).toBe('Autenticado com sucesso!')
    });
})


