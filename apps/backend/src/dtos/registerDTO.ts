import { IsEmail, IsString, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDTO {
  @IsEmail({}, { message: "Please enter a valid email" })
  email: string = "";

  @IsString()
  @IsNotEmpty({ message: "First name is required" })
  firstName: string = "";
  @IsString()
  @IsNotEmpty({ message: "First name is required" })
  lastName: string = "";

  @IsString()
  @IsNotEmpty({ message: "Last name is required" })
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password: string = "";
}
