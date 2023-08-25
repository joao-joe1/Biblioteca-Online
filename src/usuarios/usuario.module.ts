import { Module } from '@nestjs/common';
import { UsuarioController } from './controllers/usuario.controller';
import { AuthenticateUsuarioController } from './controllers/auth.controller';
import { ListaUsuarioController } from './controllers/lista-usuarios.controller';
import { UsersService } from './services/users.service';


@Module({
    controllers: [UsuarioController, AuthenticateUsuarioController, ListaUsuarioController],
    providers: [UsersService],
})

export class UsuarioModule { }
