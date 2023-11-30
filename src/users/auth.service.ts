import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UserDto } from "./dto/user.dto";
import { User } from "./model/user.entity";

//randombytes generate random numbers
//scriypt is the actual hashing library
//promisfy converts any callback function to promise.

const script = promisify(_scrypt)


@Injectable()
export class AuthService{
  constructor(private readonly userService: UserService){}

  async signUp({email, password}: UserDto): Promise<User>{
    //TODO See if email is in use.
    const users = await this.userService.getAllUserByEmail(email)
    if(users.length){
        throw new BadRequestException('Email in use')
    }
    //TODO Hash the users password.
    //Generate a salt.
    const salt = randomBytes(8).toString('hex')
    //Hash the salt and password Together.
    const hash = (await script(password, salt, 32) as Buffer)
    //Join the hashed result and salt Together
    const result = salt + '.' + hash.toString('hex')
    //TODO Create a new user and save it.
    const user = await this.userService.create({email: email, password: result})
    //TODO return the user.
    return user
  }
 
  async logIn({email, password}: UserDto): Promise<User>{
     const [user] = (await this.userService.getAllUserByEmail(email))
     if(!user){
      throw new BadRequestException('User Not Found')
     }
     const [salt, initialHash] = user.password.split('.')
     const hash = (await script(password, salt, 32) as Buffer).toString('hex')
     const result = salt + '.' + hash;
     
     if(result !== user.password){
      throw new BadRequestException('Password Incorrect')
     }
     return user;
  }
}