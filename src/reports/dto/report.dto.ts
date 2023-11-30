import { Expose, Transform } from "class-transformer"

export class ReportDto {
    @Expose()
    id: number

    @Expose()
    price: number

    @Expose()
    make: string
  
    @Expose()
    model: string

    @Expose()
    year: number

    @Expose()
    lng: number

    @Expose()
    lat: number;

    @Expose()
    milage: number

    @Expose()
    approved: boolean

    //Takes the original report entity the has the user field
    //and extract the user id.
    //don't change the obj variable name.
    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number
}