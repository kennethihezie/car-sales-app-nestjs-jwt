import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class GetEstimateDto {
    @IsString()
    make: string
  
    @IsString()
    model: string
  
    //Transform string to integer
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(2023)
    year: number
  
    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    @IsNumber()
    lng: number
  
    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    @IsNumber()
    lat: number;
  
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    milage: number
}