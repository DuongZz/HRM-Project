import { ROLE_TYPE } from '@/typeorm/entities/users/types';

export type JwtPayload = {
  id: string;
  name: string;
  email: string;
  role: ROLE_TYPE;
  created_at: Date;
};
