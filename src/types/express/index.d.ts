import { Language } from '@/typeorm/entities/users/types';
import { Device } from '@/typeorm/entities/users/device';
import { JwtPayload } from '../JwtPayload';

declare global {
  namespace Express {
    export interface Request {
      jwtPayload: JwtPayload;
      language: Language;
    }
    export interface Response {
      customSuccess(httpStatusCode: number, message: string, data?: any): Response;
    }
  }
}

declare module 'express' {
  export interface Request {
    device?: Device;
  }
}
