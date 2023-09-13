import { Injectable, OnModuleInit } from "@nestjs/common"

@Injectable()
export class AuthService {
    private readonly invalidTokens: string[] = []

    logout(authToken: string): any {
        this.invalidTokens.push(authToken)
        console.log(this.invalidTokens)
        return true
    }

    isTokenInvalid(authToken: string) {
        return this.invalidTokens.includes(authToken)
    }
}