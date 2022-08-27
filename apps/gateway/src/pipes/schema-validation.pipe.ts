import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Logger,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SchemaValidationPipe implements PipeTransform {
  private readonly logger = new Logger(SchemaValidationPipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.verbose(SchemaValidationPipe.name);
    const { password } = value;

    if (password !== '123') {
      throw new UnauthorizedException();
    }

    return value;
  }
}
