import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform {
  transform(value: any) {
    const checkIdFormat = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkIdFormat.test(value)) {
      throw new BadRequestException("Invalid ObjectID");
    }
    return value;
  }
}
