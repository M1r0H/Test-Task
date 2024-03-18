import { CoreLoggerModule } from '@core/logger.module';
import { WinstonLogger } from 'nest-winston/dist/winston.classes';

export class LoggerHelper extends WinstonLogger {
  public static provider(): WinstonLogger {
    return CoreLoggerModule.getLogger();
  }

  public static error(message: unknown, trace?: string, context?: string): unknown {
    return this.provider().error(message, trace, context);
  }

  public static debug(message: unknown, context?: string): unknown {
    return this.provider().debug(message, context);
  }

  public static verbose(message: unknown, context?: string): unknown {
    return this.provider().verbose(message, context);
  }
}
