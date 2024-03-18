import { TokensSharedModule } from '@modules/tokens/tokens-shared.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TokensSharedModule,
  ],
})
export class TokensModule {
}
