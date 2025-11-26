import { IsEmail } from "class-validator";

export class LoginDTO {
  @IsEmail({}, { message: "Please enter a valid email!" })
  email: string = "";
}
