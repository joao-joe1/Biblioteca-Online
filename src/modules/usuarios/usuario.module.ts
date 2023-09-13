import { Module } from '@nestjs/common';
import { UsuarioController } from './controllers/auth.controller';
import { ListaUsuarioController } from './controllers/lista-usuarios.controller';
import { ServiceModule } from './services/services.module';


@Module({
    providers: [ServiceModule],
    controllers: [UsuarioController, ListaUsuarioController],
    imports: [ServiceModule]
})

export class UsuarioModule { }
