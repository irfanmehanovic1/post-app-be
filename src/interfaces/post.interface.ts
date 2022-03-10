import { Document, ObjectId } from 'mongoose';

export interface IPost extends Document {
    title: string;
    date: string;
    author: string | ObjectId;
    description: string;
    comments?: any[];
}

export interface PaginationProps {
    perPage: number,
    page: number
}

export interface PaginationResponse {
    posts: IPost[],
    totalPages: number,
    currentPage: number,
    numberOfItems: number,
}

export interface IPostProps {
    title: string;
    description: string;
}