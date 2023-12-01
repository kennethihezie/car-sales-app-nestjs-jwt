import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "../users.service";
import { Helpers } from "src/utils/helper";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor (private userService: UserService, private jwtService: JwtService) {}

    async use(req: Request, res: Response, next: (error?: any) => void) {
        const token = Helpers.extractTokenFromHeader(req)
        

        if(!token){
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(token)            
            const { sub, email } = payload
            if(sub){
                const user = await this.userService.getUserById(sub)                
                // @ts-ignore
                req.currentUser = user
            }
        } catch {
            throw new UnauthorizedException()
        }
        //run any other middleware that might exist
        next()
    }
    
}