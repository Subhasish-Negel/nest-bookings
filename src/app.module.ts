import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BookingsModule } from "src/bookings/bookings.module";
import { PrismaService } from "src/prisma/prisma.service";
@Module({
  imports: [BookingsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
