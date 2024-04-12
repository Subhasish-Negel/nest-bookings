import { Module } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { BookingsController } from "./bookings.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { ValidateObjectIdPipe } from "src/pipes/validate-objectID.pipe";

@Module({
  imports: [PrismaModule],
  controllers: [BookingsController],
  providers: [BookingsService, ValidateObjectIdPipe],
  exports: [ValidateObjectIdPipe],
})
export class BookingsModule {}
