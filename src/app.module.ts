import { AppController } from '@src/app.controller';
import { ExecutionContext, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@modules/users';
import { User } from '@modules/users/entities';
import { ConfigModule } from '@nestjs/config';
import { Role } from '@modules/roles/entities';
import { AuthModule } from '@modules/auth';
import UsersFactory from '@modules/users/seeds/users.factory';
import { RolesModule } from '@modules/roles';
import { TokensModule } from '@modules/tokens';
import { UsersService } from '@modules/users/services';
import { RolesService } from '@modules/roles/services';
import { Token } from '@modules/tokens/entities';
import { CoreJwtModule } from '@core/jwt.module';
import { APP_FILTER, APP_PIPE, ContextIdFactory } from '@nestjs/core';
import { CustomValidationPipe } from '@core/pipes';
import { AllExceptionsFilter } from '@core/filters';
import { AppLoggerModule } from '@src/app-logger.module';
import { randomUUID } from 'crypto';
import { ClsModule, ClsService } from 'nestjs-cls';
import { AppCls } from '@core/types';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // Third-party modules
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      username: `${process.env.DB_USERNAME}`,
      database: process.env.DB_NAME,
      entities: [User, Role, Token],
      synchronize: false,
      logging: false,
      migrationsRun: true,
      migrations: [process.env.DB_MIGRATION_PATH],
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: () => {
          return randomUUID();
        },
        setup: (cls: ClsService<AppCls>, req: Request): void => {
          cls.set('contextId', ContextIdFactory.getByRequest(req));
        },
      },
      interceptor: {
        mount: true,
        setup: (cls: ClsService<AppCls>, context: ExecutionContext): void => {
          cls.set('context', context);
        },
      },
    }),

    // Core modules
    CoreJwtModule,
    AppLoggerModule.forRoot(),

    // Custom modules
    AuthModule,
    UsersModule,
    RolesModule,
    TokensModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  public constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {
  }

  public async onModuleInit(): Promise<void> {
    const usersCount = await this.usersService.count();
    const rolesCount = await this.rolesService.count();
    const { users, roles } = new UsersFactory().create(5);

    if (!rolesCount) {
      for (const role of roles) {
        await this.rolesService.create(role);
      }
    }

    if (!usersCount) {
      for (const user of users) {
        await this.usersService.create(user);
      }
    }
  }
}
