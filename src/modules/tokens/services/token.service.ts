import { Token } from '@modules/tokens/entities';
import { oneByTokenType, TokensInterface } from '@modules/tokens/types';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TokensService {
  @InjectRepository(Token)
  protected tokenRepository: Repository<Token>;

  public oneByToken<Payload = unknown>(params: oneByTokenType): Promise<Token<Payload>> {
    const { token, type, relations } = params;

    return this.tokenRepository.findOne({
      where: { token, type },
      relations,
    }) as Promise<Token<Payload>>;
  }

  public async create<T = unknown>(params: TokensInterface<T>): Promise<Token<T>> {
    return await this.tokenRepository.save(params);
  }

  public deleteByUserId(userId: string): Promise<DeleteResult> {
    return this.tokenRepository.delete({ userId });
  }
}
