import { Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { Observable, throwError } from 'rxjs';

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: Error): Observable<any> {
    if (exception instanceof RpcException) {
      return throwError(() => ({
        code: status.INTERNAL,
        message: exception.message,
      }));
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      let code = status.INTERNAL;

      switch (statusCode) {
        case HttpStatus.NOT_FOUND:
          code = status.NOT_FOUND;
          break;
        case HttpStatus.UNAUTHORIZED:
          code = status.UNAUTHENTICATED;
          break;
        case HttpStatus.FORBIDDEN:
          code = status.PERMISSION_DENIED;
          break;
        case HttpStatus.BAD_REQUEST:
          code = status.INVALID_ARGUMENT;
          break;
      }

      return throwError(() => ({
        code,
        message: exception.message,
      }));
    }

    return throwError(() => ({
      code: status.INTERNAL,
      message: 'Internal server error',
    }));
  }
}
