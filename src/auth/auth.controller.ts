import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { Public } from './decorator/public.decorator';

@Controller('auth')
// @Serialize(AuthUserTokenDto)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signout')
    signOut() {
        // TODO invalidate jwt token
    }

    @Public()
    @Post('/signup')
    async signUp(@Body() body: AuthUserDto){        
       return await this.authService.signUp(body)
    }

    @Public()
    @Post('/login')
    async loginUser(@Body() body: AuthUserDto){
        return await this.authService.logIn(body)
    }
}
