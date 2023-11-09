import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const SHOW_FULL_LOGS = false;
@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP REQUEST');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, url, baseUrl, body, params } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      if (SHOW_FULL_LOGS) {
        this.logger.log({
          method,
          url,
          baseUrl,
          body,
          params,
          statusCode,
          contentLength,
          userAgent,
          ip,
        });
      } else {
        this.logger.log(`${method} ${baseUrl}`);
      }
    });

    next();
  }
}
