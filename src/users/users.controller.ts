import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterceptorDto } from './dto/user.dto.interceptor';
import { UserService } from './users.service';
import { Public } from 'src/auth/decorator/public.decorator';
import { AdminGuard } from 'src/guards/admin-guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './model/user.entity';


@Controller('user')
// @Serialize(UserInterceptorDto)
export class UsersController {
    constructor(private readonly userService: UserService){}

    @Get('/user')
    getUserById(@CurrentUser() user: User){        
        return user
    }

    @Patch()
    updateUser(@Body() updateUserDto: UpdateUserDto, @CurrentUser() user: User){
       return this.userService.updateUser(user.id, updateUserDto)
    }

    @Delete()
    deleteUser(@CurrentUser() user: User){
        return this.userService.deleteUser(user.id)
    }

    @Get('/admin/:id')
    @UseGuards(AdminGuard)
    getUserAdmin(@Param('id') id: string){
        const user = this.userService.getUserById(id)
        if(!user){
            throw new NotFoundException('user not found')
        }

        return user
    }
   
    @Get('/admin/users-by-email')
    @UseGuards(AdminGuard)
    getUsersByEmail(@Query('email') email: string){        
        return this.userService.getUsersByEmail(email)
    }

    @Get('/admin')
    @UseGuards(AdminGuard)
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
