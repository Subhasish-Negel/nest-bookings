import { PartialType } from "@nestjs/mapped-types";
import { CreateBookingDto } from "./create-booking.dto";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  advance?: number;
}
