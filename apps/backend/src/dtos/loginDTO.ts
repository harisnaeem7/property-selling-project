import { IsEmail, IsNotEmpty, MinLength, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDTO {
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail({}, { message: "Please enter a valid email!" })
  email: string = "";

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters" })
  @IsNotEmpty({ message: "Please enter a valid password!" })
  password: string = "";
}
