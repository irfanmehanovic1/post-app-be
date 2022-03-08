import { Request, Response } from 'express';
import { postService } from '../services/post.service';
import { RequestType } from '../core/request.type';

const create = async (req: Request, res: Response) => {
    try {
        const { body, user } = req as RequestType; 
        const create = await postService.postCreate(body, user);
        if(!create){
            return res.status(404).send({ message: 'Not created' });
        }
        return res.send(create);;
    } catch (e) {
        console.log('postController create error', e);
        return res.status(500).send({ message: e });
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
    } catch (e) {
        console.log('postController getAllPosts error', e);
        return res.status(500).send({ message: e });
    }
}

const getPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const onePost = await postService.getPost(id);
        if(!onePost){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(onePost);
    } catch (e) {
        console.log('postController getPost error', e);
        return res.status(500).send({ message: e });
    }
};


const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user } = req as RequestType; 
        const deleted = await postService.deletePost(id, user);
        if(!deleted){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(deleted);
    } catch (e) {
        console.log('postController delete error', e);
        return res.status(500).send({ message: e });
    }
}

const edit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body, user } = req as RequestType; 
        const edit = await postService.edit(id, user, body);
        if(!edit){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(edit);
    } catch (e) {
        console.log('postController edit error', e);
        return res.status(500).send({ message: e });
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
    } catch (e) {
        console.log('postController getMyPosts error', e);
        return res.status(500).send({ message: e });
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