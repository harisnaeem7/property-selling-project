import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  Matches,
} from "class-validator";

export class createPropertyDTO {
  @IsString()
  @IsNotEmpty({ message: "Title is required" })
  title: string = "";
  @IsNumber()
  @IsNotEmpty({ message: "Price is required" })
  price: string = "";
  @IsString()
  @IsNotEmpty({ message: "Purpose is required" })
  purpose: string = "";
  @IsString()
  @IsNotEmpty({ message: "Property Type name is required" })
  propertyType: string = "";
  @IsNumber()
  @IsNotEmpty({ message: "Number of Bedrooms are required" })
  bedrooms: string = "";
  @IsNumber()
  @IsNotEmpty({ message: "Number of Bathrooms are required" })
  bathrooms: string = "";
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
  // @IsArray()
  // @IsString({ each: true })
  // @Matches(/^https:\/\/.+\.(jpg|jpeg|png|webp)$/i, {
  //   each: true,
  //   message:
  //     "Each image must be a valid image URL ending in .jpg, .jpeg, .png or .webp",
  // })
  // images!: string[];
}
