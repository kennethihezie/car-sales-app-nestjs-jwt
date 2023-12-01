import { User } from "src/users/model/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('report')
export class Report {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ default: false })
    approved: boolean

    @Column()
    price: number

    @Column()
    make: string

    @Column()
    model: string

    @Column()
    year: number

    @Column()
    lng: number

    @Column()
    lat: number

    @Column()
    milage: number

    // Creating a many to one relationship
    // once you add this it will cause a change in the database.
    // User who created this report will be accessed with report.user
    // Associtions is not automatically fetched when we fatch a report.
    @ManyToOne(() => User, (user) => user.reports)
    user: User
}