import { SetMetadata } from "@nestjs/common"

// Now we must provide a mechanism for declaring routes as public. 
// for this, we can create a custom decorator using the SetMetadata 
// factory function.

export const IS_PUBLIC_KEY = 'isPublicRoute'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)