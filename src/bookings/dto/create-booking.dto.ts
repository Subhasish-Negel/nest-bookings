import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNumber()
  @IsOptional()
  advance: number;
}
