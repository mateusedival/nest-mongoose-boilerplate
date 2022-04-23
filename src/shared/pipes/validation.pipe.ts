/* eslint-disable @typescript-eslint/ban-types */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);

    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          messages: this.buildError(errors),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return object; //Return the dto class
  }

  private buildError(errors: any[]) {
    const result: any = {};
    errors.forEach((err) => {
      const prop = err.property;
      Object.entries(err.constraints).forEach((constraint) => {
        result[prop] = `${constraint[1]}`;
      });
    });
    return result;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
