import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "src/auth/decorator/public.decorator";
import { Helpers } from "src/utils/helper";

// we need the AuthGuard to return true when the
// isPublic metadata is found. For this, we'll use the Reflector class. 
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    //This method returns a boolean if the value is not null or undefined
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if(isPublic){
            return true
        }

        const request = context.switchToHttp().getRequest()
        const token = Helpers.extractTokenFromHeader(request)

        if(!token){
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(token)            
            request['user'] = payload
        } catch {
            throw new UnauthorizedException()
        }

        return true
    }
}

/*
If the vast majority of your endpoints should be protected by default, 
you can register the authentication guard as a global guard and instead
of using @UseGuards() decorator on top of each controller, 
you could simply flag which routes should be public.

First, register the AuthGuard as a global guard using the 
following construction (in any module, for example, in the AuthModule):
*/