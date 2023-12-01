import { Report } from "src/reports/model/report.entity";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ default: false })
    admin: boolean

    // Creating a one to many relationship
    // it dosen't change the datebase.
    // Reports tied to this user will be accessed with user.reports
    // Associtions is not automatically fetched when we fatch a user.
    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]
    
    // the below decorators.
    // AfterInsert
    // AfterUpdate
    // AfterRemove
    // Are called hooks. They are called when an event takes place on the entity
    @AfterInsert()
    logInsert(){
       console.log('Inserted user with ID: ', this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Updated user with ID: ', this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log('Removed user with ID: ', this.id);
    }
}