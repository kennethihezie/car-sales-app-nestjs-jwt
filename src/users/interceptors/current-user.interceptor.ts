import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UserService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        const { userId } = request.session || {}
        
        if(userId){
           const user = this.userService.getUserById(userId)
           request.CurrentUser = user
        }

        //means go ahead excute the route
        return next.handle().pipe()
    }
}