import { Expose } from "class-transformer";
import { AuthUserInterceptorDto } from "./auth-user.dto.interceptor";

export class AuthUserTokenDto {
    @Expose()
    user: AuthUserInterceptorDto

    @Expose()
    token: string
}