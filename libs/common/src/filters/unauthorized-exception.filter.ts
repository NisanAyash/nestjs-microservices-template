import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  RpcExceptionFilter,
  HttpCode,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    return throwError(() => exception.getError());
  }
}
