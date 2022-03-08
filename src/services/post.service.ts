import Post from '../models/post.model';
import { IPost, PaginationProps } from '../interfaces/post.interface'
import { IUser } from '../interfaces/user.interface';


const postCreate = async (post: IPost, user: IUser) => {
    const date = Date.now();
    const created: IPost = await Post.create({
        ...post,
        date,
        author: user._id
    });
    return created;
};

const getAllPosts = async ({perPage, page}: PaginationProps)=> {
    const countPosts = await Post.find().count();
    const posts: IPost[] = await Post.find().skip((page - 1) * perPage).limit(perPage).sort({ date: -1});

    return {
        posts,
        totalPages: Math.ceil(countPosts/perPage),
        currentPage: page,
    }
};

const getPost = async (id: string) => {
    const post = await Post.findOne({ _id: id });
    return post;
}

const deletePost = async (id: string, user: IUser): Promise<string | null>=> {
    const post = await Post.findOne({ _id: id });
    const { _id } = user;
    if(post && (post.author == _id.toString())){
        await post.remove();
        return 'Successfuly deleted'
    } 
    return null;
}

const edit = async (id: string, user: IUser, post: IPost): Promise<IPost| null>=> {
    const {_id: _idToIgnore, ...rest} = post;
    const { _id } = user;
    const postUpdated = await Post.findOneAndUpdate({ _id: id, author: _id }, {$set: {
        ...rest
    }}, { new: true});
    if(!postUpdated){
        return null;
    }
    return postUpdated;
     
}

const getMyPosts = async (user: any, {perPage, page}: PaginationProps) => {
    const { username } = user;
    const author = username.toLowerCase();
    
    const countPosts = await Post.find().count();
    const myPosts: IPost[] = await Post.find({ author }).skip((page - 1) * perPage).limit(perPage).sort({ date: -1});
    return myPosts;
}

export const postService = {
    postCreate,
    getAllPosts,
    getPost,
    deletePost,
    edit,
    getMyPosts
}
