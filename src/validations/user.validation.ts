import _ from 'lodash';
import * as Yup from 'yup';
import { IUser, IUserLogin } from '../interfaces/user.interface';
import User from '../models/user.model';

const validationWrapper = async (schema: any, object: any) => {
  const validation = await schema.isValid(object)
  if(!validation) {
    throw new Error(validation)
  } 
  return
}

const userCreate = async (user: IUser): Promise<IUserLogin> => {
  try {
  const objectForCreate = _.pick(user, [
    'username',
    'password'
  ]);
  
  const validationObject = {
    username: Yup.string().required().strict(),
    password: Yup.string().required().strict()
  };
  
  const validateObject = Yup.object().shape(
    _.pick(validationObject, [
      'username',
      'password'
    ])
  );

  await validationWrapper(validateObject, objectForCreate)

  return objectForCreate;
  } catch (err) {
   throw new Error('userCreate validation')  
  }
};

const userExists = async(user: IUser): Promise<void> => {
  const { username } = user;
  const existingUser = await User.findOne({ username: username.toLocaleLowerCase() });
  if (existingUser) {
    throw new Error('User with that username already exists')  
  }
}

const userNotExistId = async(user: IUser): Promise<void> => {
  const { username } = user;
  const existingUser = await User.findOne({ username: username.toLocaleLowerCase() });
  if (!existingUser) {
    throw new Error('userNotExistId validation')  
  }
}

const userLogin = async (user: IUser): Promise<IUserLogin> => {
  try{
    const objectForLogin = _.pick(user, [
      'username',
      'password'
    ]);

    const validationObject = {
      username: Yup.string().required().strict(),
      password: Yup.string().required().strict()
    };
  
    const validateObject = Yup.object().shape(
      _.pick(validationObject, [
        'username',
        'password'
      ])
    );
    await validationWrapper(validateObject, objectForLogin)
    return objectForLogin;
  } catch (err) {
    throw new Error('userLogin validation')  
  }
};

export const userValidation = {
  userCreate,
  userExists,
  userNotExistId,
  userLogin,
};
