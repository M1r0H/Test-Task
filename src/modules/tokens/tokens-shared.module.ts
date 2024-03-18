import { TokensService } from '@modules/tokens/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '@modules/tokens/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
  ],
  providers: [
    TokensService,
  ],
  exports: [
    TokensService,
  ],
})
export class TokensSharedModule {
}
