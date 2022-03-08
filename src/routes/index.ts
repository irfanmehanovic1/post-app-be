import { Router } from 'express';
import userRoutes from './user.routes';
import postRoutes from './post.routes';
import commentRoutes from './comment.routes';

const router = Router();

router.get('/', (req, res) => {
    res.send({ message: 'Welcome' });
});

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

export default router;