import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../users.service";


export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UserService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        // sub is userId
        const { sub, email } = request.user
        
        if(sub){
           const user = this.userService.getUserById(sub)
           request.currentUser = user
        }

        //means go ahead excute the route
        return next.handle().pipe()
    }
}