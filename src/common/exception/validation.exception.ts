import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ValidationError,
} from '@nestjs/common';

import { Response } from 'express';

/* New error type for incorrect request */
export class ValidationException extends Error {
  public errors: Record<string, string>;

  constructor(validationErrors: ValidationError[]) {
    super();
    this.name = 'ValidationException';
    this.errors = {};
    for (const error of validationErrors) {
      this.errors[error.property] =
        Object.values(error.constraints).toString() ?? 'Unknown Error';
    }
  }
}

/* Exception filter catches
ValidationException and returns the exception errors as a JSON response with a status code of 400. */
@Catch(ValidationException)
export class RestApiExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(400).json(exception.errors);
  }
}
