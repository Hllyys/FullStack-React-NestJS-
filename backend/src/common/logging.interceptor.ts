import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable, tap } from 'rxjs'; // tap'ı direkt rxjs'ten al

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Request tipini belirt
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;

    const startedAt = Date.now();

    return next.handle().pipe(
      tap(() => {
        // Response tipini belirt
        const response = context.switchToHttp().getResponse<Response>();
        const statusCode = response.statusCode;

        console.log(
          `[${method}] ${url} -> ${statusCode} (${Date.now() - startedAt}ms)`,
        );
      }),
    );
  }
}
