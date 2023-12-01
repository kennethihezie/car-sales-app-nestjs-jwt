import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UserService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        // sub is userId
        try {
          const { sub, email } = request.user

          if(sub){
            const user = this.userService.getUserById(sub)
            request.currentUser = user
          }
        } catch (error) {
            console.error(error);
        }
        
        //means go ahead excute the route
        return next.handle().pipe()
    }
}