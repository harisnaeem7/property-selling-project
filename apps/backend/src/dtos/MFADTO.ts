import { IsNumber } from "class-validator";

export class MFADTO {
  @IsNumber({}, { message: "Please Enter a Valid Code" })
  code!: number;
}
