import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class createPropertyDTO {
  @IsString()
  @IsNotEmpty({ message: "Title is required" })
  title: string = "";

  @Type(() => Number)
  @IsNumber({}, { message: "Price must be a number" })
  price!: number;

  @IsString()
  @IsNotEmpty({ message: "Purpose is required" })
  purpose: string = "";

  @IsString()
  @IsNotEmpty({ message: "Property Type name is required" })
  propertyType: string = "";

  @Type(() => Number)
  @IsNumber({}, { message: "Bedrooms must be a number" })
  bedrooms!: number;

  @Type(() => Number)
  @IsNumber({}, { message: "Bathrooms must be a number" })
  bathrooms!: number;

  @IsString()
  @IsNotEmpty({ message: "Utilities are required" })
  utilities: string = "";

  @IsString()
  @IsNotEmpty({ message: "Address is required" })
  address: string = "";

  @IsString()
  @IsNotEmpty({ message: "City name is required" })
  city: string = "";

  @IsString()
  @IsNotEmpty({ message: "Description is required" })
  description: string = "";
}
