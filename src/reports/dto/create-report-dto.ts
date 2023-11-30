import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export default class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number

  @IsString()
  make: string

  @IsString()
  model: string

  @IsNumber()
  @Min(1930)
  @Max(2023)
  year: number

  @IsLongitude()
  @IsNumber()
  lng: number

  @IsLatitude()
  @IsNumber()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  milage: number
}