import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: `${configService.get('JWT_EXPIRY_TIME_HOURS')}h` },
      }),
    }),
  ],
  providers: [
    {
      provide: 'CoreJwtService',
      useExisting: JwtService,
    },
  ],
  exports: ['CoreJwtService'],
})
export class CoreJwtModule {
}
