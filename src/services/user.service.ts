import _ from 'lodash';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { IUserLogin } from '../interfaces/user.interface'
import { createBearerToken } from '../core/auth.middleware';


const saltRounds = 10;

const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
}

const userCreate = async (user: IUserLogin) => {
    const hash = await bcrypt.hashSync(user.password, saltRounds);

    const usernameInput = user.username;
    const username = usernameInput.toLocaleLowerCase();
    const created = await User.create({
        username,
        password: hash,
        authenticationNumber: getRandomInt(10000)
    });
    return _.omit(JSON.parse(JSON.stringify(created)), [
        'authenticationNumber',
        'password',
        '__v'
    ]);
};

const userLogin = async (user: IUserLogin) => {
    const usernameInput = user.username;
    const usernameToLowerCase = usernameInput.toLocaleLowerCase();
    const findUser = await User.findOne({
        username: usernameToLowerCase
    });
    if (!findUser) {
        throw new Error('userLogin wrong credentials');
    }
    const valid = bcrypt.compareSync(user.password, findUser.password)
    if (!valid) {
        throw new Error('userLogin wrong credentials');
    }

    const {_id, authenticationNumber, username } = findUser;
    const bearerToken: string = await createBearerToken(_id.toString(), authenticationNumber, username);

    const userInfo = _.omit(JSON.parse(JSON.stringify(findUser)), [
        'authenticationNumber',
        'password',
        '__v'
    ]);
    return {
        ...userInfo,
        bearerToken: bearerToken,
    };

};

const userLogout = async (user: any) => {
    const { _id } = user;
    await User.findOneAndUpdate({ _id }, {$set: { authenticationNumber: getRandomInt(10000) }}, { new: true });
    return { logout: true };
};

const getMe = async (user: any) => {
    const { _id } = user;
    const me = await User.findOne({ _id });
    return _.omit(JSON.parse(JSON.stringify(me)), [
        'authenticationNumber',
        'password',
        '__v'
    ]);
};

export const userService = {
    userCreate,
    userLogin,
    userLogout,
    getMe
}
