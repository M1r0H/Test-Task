import { CoreLoggerModule } from '@core/logger.module';
import { DynamicModule, Module } from '@nestjs/common';
import { assign } from 'lodash';
import { WinstonLogger } from 'nest-winston/dist/winston.classes';
import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({})
export class AppLoggerModule {
  public static forRoot(): DynamicModule {
    return assign(this.getModule(), {
      imports: [
        ConfigModule,
        CoreLoggerModule.forRoot({
          ...this.options(),
          instance: this.getLogger().getWinstonLogger(),
        }),
      ],
      providers: [],
      exports: [],
    } as DynamicModule);
  }

  public static createLogger(): WinstonLogger {
    const logger = CoreLoggerModule.createLogger(this.options());

    CoreLoggerModule.setLogger(logger);

    return logger;
  }

  public static getLogger(): WinstonLogger {
    return CoreLoggerModule.getLogger() ?? this.createLogger();
  }

  protected static options(): WinstonModuleOptions {
    return {
      level: process.env.LOGGER_LEVEL || 'silly',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(`test-task`, {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
      ],
    };
  }

  protected static getModule(): DynamicModule {
    return {
      global: true,
      module: AppLoggerModule,
      providers: [],
      exports: [],
    };
  }
}
