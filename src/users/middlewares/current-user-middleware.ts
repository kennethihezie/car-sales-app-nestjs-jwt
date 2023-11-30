import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "../users.service";

// Declare a global namespace telling nestjs that the express class can have addtional parameter.
// declare global {
//     namespace Express {
//         interface Request {
//             currentUser?: User
//         }
//     }
// }
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor (private userService: UserService) {}

    async use(req: Request, res: Response, next: (error?: any) => void) {
        // @ts-ignore
        const { userId } = req.session || {}

        if(userId){
            const user = this.userService.getUserById(userId)
            // @ts-ignore
            req.currentUser = user
        }
        //run any other middleware that might exist
        next()
    }
    
}