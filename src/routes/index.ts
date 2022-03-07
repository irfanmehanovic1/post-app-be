import { Router } from 'express';
import userRoutes from './user.routes';

const router = Router();

router.get('/', (req, res) => {
    res.send({ message: 'Welcome' });
});

router.use('/user', userRoutes);

export default router;