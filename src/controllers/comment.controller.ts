import { Request, Response } from 'express';
import { commentService } from '../services/comment.service';
import { RequestType } from '../core/request.type';
import { commentValidation } from '../validations/comment.validation';
import { postValidation } from '../validations/post.validation';


const create = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Post ID where is user commenting
        await postValidation.postNotExistId(id);

        const { body, user } = req as RequestType; 
        const objectToCreate: any = await commentValidation.commentCreate(body);
        
        const create = await commentService.commentCreate(objectToCreate, user, id);
        if(!create){
            return res.status(404).send({ message: 'Not created' });
        }
        return res.send(create);
    } catch (e: any) {
        console.log('commentController create error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

const getAllComments = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await postValidation.postNotExistId(id);

        const comments = await commentService.getAllComments(id);
        if(comments.length < 1){
            return res.send({ message: 'There are no comments to show.'});
        }
        return res.send(comments);
    } catch (e: any) {
        console.log('commentController getAllComments error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

const getComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await commentValidation.commentNotExistId(id);

        const oneComment = await commentService.getComment(id);
        if(!oneComment){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(oneComment);
    } catch (e: any) {
        console.log('commentController getComment error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
};


const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await commentValidation.commentNotExistId(id);

        const { user } = req as RequestType; 
        const deleted = await commentService.deleteComment(id, user);
        if(!deleted){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(deleted);
    } catch (e: any) {
        console.log('commentController deleteComment error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

const edit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await commentValidation.commentNotExistId(id);

        const { body, user } = req as RequestType; 
        const objectToEdit: any = await commentValidation.commentEdit(body);

        const edit = await commentService.edit(id, user, objectToEdit);
        if(!edit){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(edit);
    } catch (e: any) {
        console.log('commentController edit error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

const reply = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Comment ID where is user replying
        await commentValidation.commentNotExistId(id);

        const { body, user } = req as RequestType; 
        const objectToCreate: any = await commentValidation.commentCreate(body);
        
        const reply = await commentService.commentCreate(objectToCreate, user, id);
        if(!reply){
            return res.status(404).send({ message: 'Not created' });
        }
        return res.send(reply);
    } catch (e: any) {
        console.log('commentController reply error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

export const commentController = {
    create,
    getAllComments,
    getComment,
    deleteComment,
    edit,
    reply
}