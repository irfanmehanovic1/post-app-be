import Comment from '../models/comment.model';
import { IComment } from '../interfaces/comment.interface';
import { IUser } from '../interfaces/user.interface';


const commentCreate = async (comment: IComment, user: IUser, id: string): Promise<IComment> => {
    const date = Date.now();
    const created: IComment = await Comment.create({
        ...comment,
        date,
        author: user._id,
        postRef: id,
        commentRef: null,
        depth: 0
    });
    return created;
};

const getAllComments = async (id: string): Promise<IComment[]>=> {
    const comments: IComment[] = await Comment.find({ postRef: id });
    return comments;
};

const getComment = async (id: string) => {
    const comment = await Comment.findOne({ _id: id });
    return comment;
}

const deleteComment = async (id: string, user: IUser): Promise<string | null>=> {
    const comment = await Comment.findOne({ _id: id });
    const { _id } = user;
    if(comment && (comment.author == _id.toString())){
        await comment.remove();
        return 'Successfuly deleted'
    } 
    return null;
}

const edit = async (id: string, user: IUser, comment: IComment): Promise<IComment| null>=> {
    const {_id: _idToIgnore, ...rest} = comment;
    const { _id } = user;
    const commentUpdated = await Comment.findOneAndUpdate({ _id: id, author: _id }, {$set: {
        ...rest
    }}, { new: true});
    if(!commentUpdated){
        return null;
    }
    return commentUpdated;
}

const reply = async (comment: IComment, user: IUser, id: string): Promise<IComment> => {
    const parentComment = await Comment.findOne({ _id: id });
    const date = Date.now();
    const replied: IComment = await Comment.create({
        ...comment,
        date,
        author: user._id,
        postRef: parentComment?.postRef,
        commentRef: id,
        depth: (parentComment?.depth || 0) + 1
    });
    return replied;
}

export const commentService = {
    commentCreate,
    getAllComments,
    getComment,
    deleteComment,
    edit,
    reply
}
