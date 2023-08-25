import { Module } from '@nestjs/common';
import { UsuarioController } from './controllers/usuario.controller';
import { AuthenticateUsuarioController } from './controllers/auth.controller';
import { ListaUsuarioController } from './controllers/lista-usuarios.controller';


@Module({
    controllers: [UsuarioController, AuthenticateUsuarioController, ListaUsuarioController],
})

export class UsuarioModule { }
