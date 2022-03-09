import { Request, Response } from 'express';
import { userValidation } from '../validations/user.validation';
import { userService } from '../services/user.service';
import { RequestType } from '../core/request.type';
import { IUserLogin } from '../interfaces/user.interface';

const create = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        await userValidation.userExists(body);
        const userBody = await userValidation.userCreate(body);
        const create = await userService.userCreate(userBody);
        if(!create){
            return res.status(404).send({ message: 'Not created' });
        }
        return res.send(create);
    } catch (e: any) {
        console.log('userController create error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const objectToLogin: IUserLogin = await userValidation.userLogin(body);
        const login = await userService.userLogin(objectToLogin);
        if(!login){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(login);
    } catch (e: any) {
        console.log('userController login error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        const { user } = req as RequestType; 
        await userValidation.userNotExistId(user);

        const logout = await userService.userLogout(user);
        if(!logout){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(logout);
    } catch (e: any) {
        console.log('userController logout error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}

const getMe = async (req: Request, res: Response) => {
    try {
        const { user } = req as RequestType; 
        await userValidation.userNotExistId(user);

        const me = await userService.getMe(user);
        if(!me){
            return res.status(404).send({ message: 'Not found' });
        }
        return res.send(me);
    } catch (e: any) {
        console.log('userController getMe error', e);
        return res.status(500).send({ message: JSON.stringify(e.message) });
    }
}


export const userController = {
    create,
    login,
    logout,
    getMe
}