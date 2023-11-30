import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    //The ExecutionContext is the incoming request. Which can be http, web sockets, grpc, graphql
    //never means don't pass any argument
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        return request.currentUser
    }
)