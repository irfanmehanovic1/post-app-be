import { Router } from 'express';
import { postController } from '../controllers/post.controller';
import { auth } from '../core/auth.middleware';


const postRouter = Router();

postRouter.route('/myposts').get(auth, postController.getMyPosts);

postRouter.route('/create').post(auth, postController.create);

postRouter.route('/').get(postController.getAllPosts);

postRouter.route('/:id').get(postController.getPost);

postRouter.route('/:id').delete(auth, postController.deletePost);

postRouter.route('/:id').patch(auth, postController.edit);


export default postRouter;