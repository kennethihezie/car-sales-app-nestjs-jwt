import { BadRequestException, Injectable } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "src/users/dto/user.dto";
import { UserService } from "src/users/users.service";
import { AuthUserTokenDto } from "./dto/auth-user-token.dto";

// randombytes generate random numbers
// scriypt is the actual hashing library
// promisfy converts any callback function to promise.

const script = promisify(_scrypt)

@Injectable()
export class AuthService{
  constructor(private readonly userService: UserService, private jwtService: JwtService){}

  async signUp({email, password}: UserDto): Promise<AuthUserTokenDto>{
    // See if email is in use.
    const users = await this.userService.getAllUserByEmail(email)
    if(users.length){
        throw new BadRequestException('Email in use')
    }
    // Hash the users password.
    // Generate a salt.
    const salt = randomBytes(8).toString('hex')
    //Hash the salt and password Together.
    const hash = (await script(password, salt, 32) as Buffer)
    // Join the hashed result and salt Together
    const result = salt + '.' + hash.toString('hex')
    // Create a new user and save it.
    const user = await this.userService.create({email: email, password: result})

    // Generate a JWT and return it here
    // Note: we choose a property name of sub to 
    // hold our userId value to be consistent with JWT standards. 
    const payload = { sub: user.id, email: user.email }
    const token = await this.jwtService.signAsync(payload)
    
    // return the user and token.
    return { user, token }
  }
 
  async logIn({email, password}: UserDto): Promise<AuthUserTokenDto>{
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

     const payload = { sub: user.id, email: user.email }
     const token = await this.jwtService.signAsync(payload)

     // return the user and token.
     return { user, token }
  }
}