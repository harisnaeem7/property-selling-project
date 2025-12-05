import { IsEmail } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDTO {
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail({}, { message: "Please enter a valid email!" })
  email: string = "";
}
