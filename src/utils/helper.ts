import { Request } from "express";


export class Helpers {
    static extractTokenFromHeader(request: Request): string | undefined {        
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}