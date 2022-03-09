import _ from 'lodash';
import * as Yup from 'yup';
import { IPost, IPostProps } from '../interfaces/post.interface';
import Post from '../models/post.model';

const validationWrapper = async (schema: any, object: any) => {
  const validation = await schema.isValid(object)
  if(!validation) {
    throw new Error(validation)
  } 
  return
}

const postCreate = async (post: IPost): Promise<IPostProps> => {
    try {
    const objectForCreate = _.pick(post, [
      'title',
      'description'
    ]);
    
    const validationObject = {
      title: Yup.string().required().strict(),
      description: Yup.string().required().strict()
    };
    
    const validateObject = Yup.object().shape(
      _.pick(validationObject, [
        'title',
        'description'
      ])
    );
  
    await validationWrapper(validateObject, objectForCreate)
  
    return objectForCreate;
    } catch (err) {
     throw new Error('postCreate validation')  
    }
};

const postNotExistId = async(_id: string): Promise<void> => {
    const existingPost = await Post.findOne({ _id });
    if (!existingPost) {
        throw new Error('postNotExistId validation')  
    }
}

const postEdit = async(post: IPost): Promise<IPostProps> => {
    try{
      const objectForUpdate = _.pick(post, [
        'title',
        'description',
      ]);
  
      const validationObject = {
        title: Yup.string().strict(),
        description: Yup.string().strict(),
      };
    
      const validateObject = Yup.object().shape(
        _.pick(validationObject, [
          'title',
          'description',
        ])
      );
      await validationWrapper(validateObject, objectForUpdate)
      return objectForUpdate;
    } catch (err) {
      throw new Error('postEdit validation')  
    }
  }

export const postValidation = {
    postCreate,
    postNotExistId,
    postEdit
  };