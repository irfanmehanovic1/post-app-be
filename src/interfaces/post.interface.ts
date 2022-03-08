import { Document, ObjectId } from 'mongoose';

export interface IPost extends Document {
    title: string;
    date: string;
    author: string | ObjectId;
    description: string;
}

export interface PaginationProps {
    perPage: number,
    page: number
}