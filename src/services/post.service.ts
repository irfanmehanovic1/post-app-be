import { ObjectId } from 'mongodb';

import Post from '../models/post.model';
import { IPost, IPostProps, PaginationProps, PaginationResponse } from '../interfaces/post.interface'
import { IUser } from '../interfaces/user.interface';
import Comment from '../models/comment.model';


const postCreate = async (post: IPostProps, user: IUser): Promise<IPost> => {
    const date = Date.now();
    const created: IPost = await Post.create({
        ...post,
        date,
        author: user._id
    });
    return created;
};

const getAllPosts = async ({perPage, page}: PaginationProps): Promise<any>=> {
    const countPosts = await Post.find().count();
    const posts: IPost[] = await Post.aggregate( 
        [
            // { $match: { _id: new ObjectId("6226523967873accf0353e1e")}},
            { $sort : { date : -1 } },
            { $skip : (page - 1) * perPage },
            { $limit : perPage },
            {
                $lookup:
                  {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postRef',
                    as: 'comments'
                  }
             }
        ] 
    );

    posts.forEach((el: any) => {
        const commentHashMap: any = {};
        el.comments.forEach((e: any) => {
            if(!commentHashMap[e.depth]){
                commentHashMap[e.depth] = [e];
            } else {
                commentHashMap[e.depth].push(e);
            }
        });
        Object.keys(commentHashMap).forEach(key => {
            commentHashMap[key].forEach((e: any) => {
                const { _id, depth } = e;
                if(commentHashMap[depth + 1]){
                    e.comments = commentHashMap[depth + 1].filter((aa:any) => aa.commentRef.toString() === _id.toString());
                }
            })
        });
        el.comments = commentHashMap[0];
    });
    return {
        posts,
        totalPages: Math.ceil(countPosts/perPage),
        currentPage: page
    }
};

const getPost = async (id: string): Promise<IPost| null> => {
    const post = await Post.findOne({ _id: id });
    return post;
}

const deletePost = async (id: string, user: IUser): Promise<string>=> {
    const { _id } = user;
    const post: any[] = await Post.aggregate( 
        [
            { $match: { _id: new ObjectId(`${id}`)}},
            {
                $lookup:
                  {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postRef',
                    as: 'comments'
                  }
             }
        ] 
    );

    if(post[0].author != _id.toString()){
        throw new Error('Cannot delete other user\'s posts');
    } 

    if(post[0].comments.length > 0){
        throw new Error('Cannot delete post as it has comment/comments.');
    }
    // Delete all comments for that post
    await Comment.deleteMany({ postRef: id});
    // Delete that psot
    await Post.findOneAndDelete({ _id: id });
    return 'Successfuly deleted'

}

const edit = async (id: string, user: IUser, post: IPost): Promise<IPost| null>=> {
    const {_id: _idToIgnore, ...rest} = post;
    const { _id } = user;
    const postUpdated = await Post.findOneAndUpdate({ _id: id, author: _id }, {$set: {
        ...rest
    }}, { new: true});
    return postUpdated;
     
}

const getMyPosts = async (user: IUser, {perPage, page}: PaginationProps): Promise<PaginationResponse> => {
    const { _id } = user;
    
    const countPosts = await Post.find({ author: _id }).count();

    const myPosts: IPost[] = await Post.aggregate( 
        [
            { $match: { author: _id }},
            { $sort : { date : -1 } },
            { $skip : (page - 1) * perPage },
            { $limit : perPage },
            {
                $lookup:
                  {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postRef',
                    as: 'comments'
                  }
             }
        ] 
    );

    myPosts.forEach((el: any) => {
        const commentHashMap: any = {};
        el.comments.forEach((e: any) => {
            if(!commentHashMap[e.depth]){
                commentHashMap[e.depth] = [e];
            } else {
                commentHashMap[e.depth].push(e);
            }
        });
        Object.keys(commentHashMap).forEach(key => {
            commentHashMap[key].forEach((e: any) => {
                const { _id, depth } = e;
                if(commentHashMap[depth + 1]){
                    e.comments = commentHashMap[depth + 1].filter((aa:any) => aa.commentRef.toString() === _id.toString());
                }
            })
        });
        el.comments = commentHashMap[0];
    });
    return {
        posts: myPosts,
        totalPages: Math.ceil(countPosts/perPage),
        currentPage: page,
    }
}

export const postService = {
    postCreate,
    getAllPosts,
    getPost,
    deletePost,
    edit,
    getMyPosts
}
