import { Request, Response } from 'express';
import { commentService } from '../services/comment.service';
import { RequestType } from '../core/request.type';

const create = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body, user } = req as RequestType; 
        const create = await commentService.commentCreate(body, user, id);
        if(!create){
            return res.status(404).send({ message: 'Not created' });
        }
        return res.send(create);;
    } catch (e) {
        console.log('commentController create error', e);
        return res.status(500).send({ message: e });
    }
}

const getAllComments = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comments = await commentService.getAllComments(id);
        if(comments.length < 1){
            return res.send({ message: 'There are no comments to show.'});
        }
        return res.send(comments);
    } catch (e) {
        console.log('commentController getAllComments error', e);
        return res.status(500).send({ message: e });
    }
}

const getComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const oneComment = await commentService.getComment(id);
        if(!oneComment){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(oneComment);
    } catch (e) {
        console.log('commentController getComment error', e);
        return res.status(500).send({ message: e });
    }
};


const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user } = req as RequestType; 
        const deleted = await commentService.deleteComment(id, user);
        if(!deleted){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(deleted);
    } catch (e) {
        console.log('commentController deleteComment error', e);
        return res.status(500).send({ message: e });
    }
}

const edit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body, user } = req as RequestType; 
        const edit = await commentService.edit(id, user, body);
        if(!edit){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(edit);
    } catch (e) {
        console.log('commentController edit error', e);
        return res.status(500).send({ message: e });
    }
}

const getMyComments = async (req: Request, res: Response) => {
    try {
        const { user } = req as RequestType; 
        const myComments = await commentService.getMyComments(user);
        if(myComments.length < 1){
            return res.send({ message: 'There are no posts to show.'});
        }
        return res.send(myComments);
    } catch (e) {
        console.log('commentController getMyComments error', e);
        return res.status(500).send({ message: e });
    }
}

export const commentController = {
    create,
    getAllComments,
    getComment,
    deleteComment,
    edit,
    getMyComments
}