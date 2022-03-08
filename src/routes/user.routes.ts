import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { auth } from '../core/auth.middleware';

const userRouter = Router();

userRouter.route('/create').post(userController.create);

userRouter.route('/login').post(userController.login);

userRouter.route('/logout').get(auth, userController.logout);

userRouter.route('/getMe').get(auth, userController.getMe);

export default userRouter;