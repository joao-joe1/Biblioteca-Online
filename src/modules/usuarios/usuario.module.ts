import { Module } from '@nestjs/common';
import { UsuarioController } from './controllers/usuario.controller';
import { AuthenticateUsuarioController } from './controllers/auth.controller';
import { ListaUsuarioController } from './controllers/lista-usuarios.controller';
import { UsersService } from './services/users.service';
import { BuscaUsuarioController } from './controllers/busca-usuario.controller';


@Module({
    controllers: [UsuarioController, AuthenticateUsuarioController, ListaUsuarioController, BuscaUsuarioController],
    providers: [UsersService],
})

export class UsuarioModule { }
