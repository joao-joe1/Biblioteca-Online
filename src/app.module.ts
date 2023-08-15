import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsuarioModule } from './usuarios/usuario.module';
import { LivroModule } from './livros/livros.module';
import { ApiTokenCheckMiddleware } from './middlewares/api-token-check.middleware';
import { AdminCheckMiddleware } from './middlewares/admin-check.middleware';

@Module({
  imports: [UsuarioModule, LivroModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiTokenCheckMiddleware)
      .forRoutes('livros', 'buscalivros')

      .apply(AdminCheckMiddleware)
      .forRoutes('livros', 'buscalivros')
  }
}
