import { IsEmail } from "class-validator";

export class ResetDTO {
  @IsEmail({}, { message: "Please enter a valid email!" })
  email: string = "";
}
