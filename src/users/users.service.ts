import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './model/user.entity';

@Injectable()
export class UserService {
    //inject typeorm repository into the constructor.
    constructor(@InjectRepository(User) private repository: Repository<User>){}

    //create a user
    async create(userDto: UserDto){
       //const { email, password } = userDto
       //creates an instance of the user entity
       //userDto is the same shape with the user class.Because the id is auto generated
       const user = this.repository.create(userDto)

       //save the user data to the database
       return this.repository.save(user)
    }

    //get a user by id
    async getUserById(id: string): Promise<User> {
        if(!id){
            return null
        }
        return await this.repository.findOneBy({ id })
    }

    //find a user by email
    async getUsersByEmail(email: string): Promise<User[]> {
        return await this.repository.find({ where: { email }})
    }

    async getAllUsers(): Promise<User[]> {
        return await this.repository.find()
    }

    //partial here is a typescript thing. so its basically saying attrs 
    //can have any attribute of the user class
    async updateUser(id: string, attrs: Partial<User>){
       //This is efficient but dosen't call hooks
       //return this.repository.update(id, attrs)

       //This require two query not efficient but hooks are called
       const user = await this.getUserById(id)
       if(!user){
        throw new NotFoundException('User not found')
       }

       //copies attrs to user
       Object.assign(user, attrs)

       return this.repository.save(user)
    }

    async deleteUser(id: string){
        //This is efficient but dosen't call hooks
        //return this.repository.delete(id)

        //This require two query not efficient but hooks are called
       const user = await this.getUserById(id)
       if(!user){
        throw new NotFoundException('User not found')
       }

       return this.repository.remove(user)
    }
}
