import { Inject, Injectable, LoggerService as CommonLoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { WinstonLogger } from 'nest-winston/dist/winston.classes';

@Injectable()
export class LoggerService implements CommonLoggerService {
  public constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly winstonLogger: WinstonLogger,
  ) {
  }

  public log(message: unknown, context?: string): unknown {
    return this.winstonLogger.log(message, context);
  }

  public error(message: unknown, trace?: string, context?: string): unknown {
    return this.winstonLogger.error(message, trace, context);
  }

  public warn(message: unknown, context?: string): unknown {
    return this.winstonLogger.warn(message, context);
  }

  public debug?(message: unknown, context?: string): unknown {
    return this.winstonLogger.debug(message, context);
  }

  public verbose?(message: unknown, context?: string): unknown {
    return this.winstonLogger.verbose(message, context);
  }
}
