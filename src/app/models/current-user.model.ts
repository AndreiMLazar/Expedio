import { User } from './user.model';

export class CurrentUser extends User {
  token: string;
  expiresIn: number;
  userId: string;
}
