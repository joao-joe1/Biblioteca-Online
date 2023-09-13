import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { AuthService } from "src/modules/usuarios/services/auth.service";
import { PrismaService } from "src/prisma/prisma.service";

interface AuthPayload {
    sub: string
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService) { }

    private readonly JWT_SECRET: string = process.env.JWT_SECRET || "";

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest()
        const authToken = request.headers.authorization as string

        if (!authToken) {
            return false
        }

        const token = authToken.split(' ')[1]

        const isValidToken = this.authService.isTokenInvalid(token)

        if (isValidToken) {
            console.log('token expirado.')
            return false
        }

        try {
            const decodedToken = verify(token, this.JWT_SECRET) as AuthPayload;
            const user = await this.prismaService.users.findUnique({
                where: { id: decodedToken.sub }
            })

            if (!user) {
                return false;
            }

            request.user_id = decodedToken.sub
            return true;
        } catch (error) {
            return false
        }
    }
}