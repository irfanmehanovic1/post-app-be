import { Document } from 'mongoose';

export interface IComment extends Document {
    text: string;
    date: string;
    author: string;
    postRef: string;
    commentRef: string;
}
