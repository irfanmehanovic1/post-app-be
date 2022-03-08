import { Request, Response } from 'express';
import { userValidation } from '../validations/user.validation';
import { userService } from '../services/user.service';

const create = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        await userValidation.userExists(body);
        const userBody = await userValidation.userCreate(body);
        console.log(userBody, 'Irfoni bomboni')
        const create = await userService.userCreate(userBody);
        if(!create){
            return res.status(404).send({ message: 'Not created' });
        }
        return res.send(create);
    } catch (e) {
        console.log('userController create error', e);
        return res.status(500).send({ message: e });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const login = await userService.userLogin(body);
        if(!login){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(login);
    } catch (e) {
        console.log('userController login error', e);
        return res.status(500).send({ message: e });
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const logout = await userService.userLogout(body);
        if(!logout){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(logout);
    } catch (e) {
        console.log('userController logout error', e);
        return res.status(500).send({ message: e });
    }
}

const getMe = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const me = await userService.getMe(body);
        if(!me){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(me);
    } catch (e) {
        console.log('userController getMe error', e);
        return res.status(500).send({ message: e });
    }
}


export const userController = {
    create,
    login,
    logout,
    getMe
}