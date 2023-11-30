import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterceptorDto } from './dto/user.dto.interceptor';
import { UserService } from './users.service';


@Controller('user')
@Serialize(UserInterceptorDto)
export class UsersController {
    constructor(private readonly userService: UserService){}

    @Get('/:id')
    getUserById(@Param('id') id: string){
        const user = this.userService.getUserById(id)
        if(!user){
            throw new NotFoundException('user not found')
        }

        return user
    }

    @Patch('/:id')
    updateAUser(@Param('id') id: string,  @Body() updateUserDto: UpdateUserDto){
       return this.userService.updateUser(id, updateUserDto)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id)
    }
   

    @Get('/userByEmail')
    getAllUserByEmail(@Query('email') email: string){
        return this.userService.getAllUserByEmail(email)
    }

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }
}

//Interceptors
/*
Interceptors can be used to intercept outgoing reponses or incoming requests. 
we can have many interceptor intercept a particular incoming or outgoing request.

Interceptors can be applied to a single handler, all the handlers in controller or globally.
*/
