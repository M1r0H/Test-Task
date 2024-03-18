import { LoggerService } from '@core/services';
import { DynamicModule, Module } from '@nestjs/common';
import { assign } from 'lodash';
import { WinstonModule } from 'nest-winston';
import { WinstonLogger } from 'nest-winston/dist/winston.classes';
import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';

@Module({})
export class CoreLoggerModule {
  private static logger: WinstonLogger;

  public static forRoot(config?: WinstonModuleOptions): DynamicModule {
    return assign(this.getModule(), {
      imports: [
        WinstonModule.forRoot({
          ...config,
          instance: this.logger?.getWinstonLogger(),
        }),
      ],
      providers: [
        LoggerService,
      ],
      exports: [
        LoggerService,
      ],
    } as DynamicModule);
  }

  public static createLogger(config?: WinstonModuleOptions): WinstonLogger {
    return WinstonModule.createLogger(config) as WinstonLogger;
  }

  public static getLogger(): WinstonLogger {
    return this.logger;
  }

  public static setLogger(logger: WinstonLogger): void {
    this.logger = logger;
  }

  protected static getModule(): DynamicModule {
    return {
      global: true,
      module: CoreLoggerModule,
      providers: [],
      exports: [],
    };
  }
}
