import { Router } from 'express';
import { postController } from '../controllers/post.controller';
import { auth } from '../core/auth.middleware';


const postRouter = Router();

postRouter.route('/create').post(auth, postController.create);

postRouter.route('/').get(postController.getAllPosts);

postRouter.route('/:id').get(postController.getPost);

postRouter.route('/:id').delete(auth, postController.deletePost);

postRouter.route('/:id').patch(auth, postController.edit);

postRouter.route('/myposts').patch(auth, postController.getMyPosts);

export default postRouter;