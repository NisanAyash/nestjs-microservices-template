import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    const path = req.path;
    const headers = req.headers;
    const body = req.body;
    const timestamp = Date.now();
    const method = req.method;
    const baseUrl = req.baseUrl;

    this.logger.verbose(`LoggerMiddleware ${method} ${path}`);

    next();
  }
}
