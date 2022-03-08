import { Document } from 'mongoose';
import { ObjectId } from 'mongodb'

export interface IUser extends Document {
    _id: ObjectId,
    authenticationNumber: number
    password: string;
    username: string;
}
