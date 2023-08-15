import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuarios/usuario.module';
import { LivroModule } from './livros/livros.module';

@Module({
  imports: [UsuarioModule, LivroModule],
})
export class AppModule { }
