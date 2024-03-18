export type oneByTokenType = {
  token: string;
  type?: string;
  relations?: string[];
};

export type tokenExpireType = {
  hours: number;
};

export interface TokensInterface<T = unknown> {
  type: string;
  token: string;
  payload?: T;
  expiry?: Date;
  userId: string;
}
