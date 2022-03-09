import { Request, Response } from 'express';
import { postService } from '../services/post.service';
import { RequestType } from '../core/request.type';
import { postValidation } from '../validations/post.validation';

const create = async (req: Request, res: Response) => {
    try {
        const { body, user } = req as RequestType; 
        const objectToCreate: any = await postValidation.postCreate(body);
        const create = await postService.postCreate(objectToCreate, user);
        if(!create){
            return res.status(404).send({ message: 'Not created' });
        }
        return res.send(create);;
    } catch (e: any) {
        console.log('postController create error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const { perPage, page } = req.query;
        const posts = await postService.getAllPosts({
            perPage: Number(perPage) || 5, 
            page: Number(page) || 1
        });
        return res.send(posts);
    } catch (e: any) {
        console.log('postController getAllPosts error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

const getPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await postValidation.postNotExistId(id);

        const onePost = await postService.getPost(id);
        if(!onePost){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(onePost);
    } catch (e: any) {
        console.log('postController getPost error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
};


const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await postValidation.postNotExistId(id);
        
        const { user } = req as RequestType; 
        const deleted = await postService.deletePost(id, user);
        if(!deleted){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(deleted);
    } catch (e: any) {
        console.log('postController delete error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

const edit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await postValidation.postNotExistId(id);

        const { body, user } = req as RequestType; 
        const objectToEdit: any = await postValidation.postEdit(body);
        
        const edit = await postService.edit(id, user, objectToEdit);
        if(!edit){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(edit);
    } catch (e: any) {
        console.log('postController edit error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

const getMyPosts = async (req: Request, res: Response) => {
    try {
        const { perPage, page } = req.query;
        const { user } = req as RequestType; 
        const myPosts = await postService.getMyPosts(user,{
            perPage: Number(perPage) || 5, 
            page: Number(page) || 1
        });
        return res.send(myPosts);
    } catch (e: any) {
        console.log('postController getMyPosts error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

export const postController = {
    create,
    getAllPosts,
    getPost,
    deletePost,
    edit,
    getMyPosts
}