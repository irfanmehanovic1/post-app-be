import { Router } from 'express';
import { auth } from '../core/auth.middleware';
import { commentController } from '../controllers/comment.controller';


const commentRouter = Router();

commentRouter.route('/create/post/:id').post(auth, commentController.create);

commentRouter.route('/post/:id').get(commentController.getAllComments);

commentRouter.route('/:id').get(commentController.getComment);

commentRouter.route('/:id').delete(auth, commentController.deleteComment);

commentRouter.route('/:id').patch(auth, commentController.edit);

commentRouter.route('/mycomments').patch(auth, commentController.getMyComments);

export default commentRouter;