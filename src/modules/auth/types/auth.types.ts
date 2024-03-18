import { User } from '@modules/users/entities';

export type GenerateToken = {
  expiry: number;
  user?: User;
};
