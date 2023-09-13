import { Module } from "@nestjs/common";
import { ServiceModule } from "src/modules/usuarios/services/services.module";
import { AuthService } from "src/modules/usuarios/services/auth.service";
import { AdminCheckGuard } from "./admin-check.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Module({
    providers: [JwtAuthGuard, AdminCheckGuard, AuthService],
    imports: [ServiceModule]
})
export class GuardModule { }