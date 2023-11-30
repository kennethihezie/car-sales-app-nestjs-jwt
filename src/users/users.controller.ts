import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserInterceptorDto } from './dto/user.dto.interceptor';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './model/user.entity';
import { UserService } from './users.service';


@Controller('auth')
//Controller level interceptor
@Serialize(UserInterceptorDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService){}

    @UseGuards(AuthGuard)
    @Get('/current/user')
    getCurrentlySignedInUser(@CurrentUser() user: User) {
        return user
    }
    
    // @Get('/current/user')
    // getCurrentlySignedInUser(@Session() session: any) {
    //     return this.userService.getUserById(session.userId)
    // }


    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null
    }

    @Post('/signup')
    async createUser(@Body() body: UserDto, @Session() session: any){
       const user = await this.authService.signUp(body)
       session.userId = user.id
       return user
       // this.userService.create(body)
    }

    @Post('/login')
    async loginUser(@Body() body: UserDto, @Session() session: any){
        const user = await this.authService.logIn(body)
        session.userId = user.id
        return user
    }

    //Handler level interceptor
    //@Serialize(UserInterceptorDto)
    @Get('/:id')
    getUserById(@Param('id') id: string){
        const user = this.userService.getUserById(id)
        if(!user){
            throw new NotFoundException('user not found')
        }
        return user
    }

    @Get('/userByEmail')
    getAllUserByEmail(@Query('email') email: string){
        return this.userService.getAllUserByEmail(email)
    }

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id)
    }

    @Patch('/:id')
    updateAUser(@Param('id') id: string,  @Body() updateUserDto: UpdateUserDto){
       return this.userService.updateUser(id, updateUserDto)
    }
}

/*
  @Get()
  getHello(@Session() session: { views?: number }) {
    session.views = (session.views || 0) + 1;
    return session.views;
  }
*/

//Interceptors
/*
Interceptors can be used to intercept outgoing reponses or incoming requests. 
we can have many interceptor intercept a particular incoming or outgoing request.

Interceptors can be applied to a single handler, all the handlers in controller or globally.
*/
