import { Document } from 'mongoose';

export interface IComment extends Document {
    text: string;
    date: string;
    author: string;
    postRef: string;
    commentRef: string;
    depth: number;
}

export interface ICommentProps {
    text: string;
}