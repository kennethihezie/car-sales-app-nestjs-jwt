import { Expose } from "class-transformer"

export class AuthUserInterceptorDto {
    @Expose()
    id: string

    @Expose()
    email: string
}