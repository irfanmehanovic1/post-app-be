import { Request } from 'express';
import { IUser } from '../interfaces/user.interface';

export type RequestType = Request & {
    user: IUser
} 