import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('LoggingInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    const { body, method, url } = request;
    this.logger.verbose(`>>> ${method} ${url} ${JSON.stringify(body || {})}`);
    const date = Date.now();
    return next.handle().pipe(
      tap((response) => {
        const message = `<<< ${method} ${url} ${
          Date.now() - date
        } ${JSON.stringify(response || {})}`;

        this.logger.verbose(message);
      }),
    );
  }
}
