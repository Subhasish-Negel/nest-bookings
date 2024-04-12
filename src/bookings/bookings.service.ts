import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { PrismaService } from "src/prisma/prisma.service";
import {
  HttpException,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  // Creating a booking
  async create(createBookingDto: CreateBookingDto) {
    try {
      return await this.prisma.bookings.create({
        data: createBookingDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException({
          error: "A booking with the same name already exists.",
        });
      } else if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // Fetching All Bookings
  async findAll() {
    try {
      return await this.prisma.bookings.findMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // Fetching Single Booking
  async findOne(id: string) {
    const existingBooking = await this.prisma.bookings.findUnique({
      where: { id },
    });

    if (!existingBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found.`);
    }
    try {
      return await this.prisma.bookings.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // Updateing a booking
  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const existingBooking = await this.prisma.bookings.findUnique({
      where: { id },
    });

    if (!existingBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found.`);
    }

    const isBodyEmpty = Object.keys(updateBookingDto).length === 0;
    const noChangesFound = Object.entries(updateBookingDto).every(
      ([key, value]) => existingBooking[key] === value
    );

    if (isBodyEmpty || noChangesFound) {
      throw new BadRequestException("No changes found to update.");
    }

    try {
      const updatedBooking = await this.prisma.bookings.update({
        where: { id },
        data: updateBookingDto,
      });

      return {
        status: HttpStatus.OK,
        message: "Booking updated successfully.",
        booking: updatedBooking,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new BadRequestException(
            "A booking with the same name already exists."
          );
        }
        throw new BadRequestException(error.message);
      } else if (error.response) {
        throw new HttpException(error.response, error.status);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // Deleting a booking
  async remove(id: string) {
    const existingBooking = await this.prisma.bookings.findUnique({
      where: { id },
    });

    if (!existingBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found.`);
    }
    try {
      const deletedBooking = await this.prisma.bookings.delete({
        where: { id },
      });

      return {
        status: HttpStatus.OK,
        message: "Booking Record Deleted Succesfully.",
        booking: deletedBooking,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
