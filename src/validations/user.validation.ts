import _ from 'lodash';
import * as Yup from 'yup';
import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';

const validationWrapper = async (schema: any, object: any) => {
  const validation = await schema.isValid(object)
  if(!validation) {
    throw new Error(validation)
  } 
  return
}

const userCreate = async (user: IUser): Promise<any> => {
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
  const existingUser = await User.findOne({ username: user.username });
    if (existingUser) {
      throw new Error('User with that username already exists')  
    }
  }
  

export const userValidation = {
  userCreate,
  userExists,
};
