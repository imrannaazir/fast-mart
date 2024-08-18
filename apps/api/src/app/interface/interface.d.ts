import { TUser } from '@repo/utils/types';

declare global {
  namespace Express {
    interface Request {
      user: TUser;
    }
  }
}
