import _ from 'lodash';
import * as Yup from 'yup';
import { IComment, ICommentProps } from '../interfaces/comment.interface';
import Comment from '../models/comment.model';

const validationWrapper = async (schema: any, object: any) => {
  const validation = await schema.isValid(object)
  if(!validation) {
    throw new Error(validation)
  } 
  return
}

const commentCreate = async (comment: IComment): Promise<ICommentProps> => {
    try {
    const objectForCreate = _.pick(comment, [
      'text'
    ]);
    
    const validationObject = {
      text: Yup.string().required().strict()
    };
    
    const validateObject = Yup.object().shape(
      _.pick(validationObject, [
        'text'
      ])
    );
  
    await validationWrapper(validateObject, objectForCreate)
  
    return objectForCreate;
    } catch (err) {
     throw new Error('commentCreate validation')  
    }
};

const commentNotExistId = async(_id: string): Promise<void> => {
    const existingComment = await Comment.findOne({ _id });
    if (!existingComment) {
        throw new Error('commentNotExistId validation')  
    }
}

const commentEdit = async(comment: IComment): Promise<ICommentProps> => {
    try{
      const objectForUpdate = _.pick(comment, [
        'text'
      ]);
  
      const validationObject = {
        text: Yup.string().strict()
      };
    
      const validateObject = Yup.object().shape(
        _.pick(validationObject, [
          'text'
        ])
      );
      await validationWrapper(validateObject, objectForUpdate)
      return objectForUpdate;
    } catch (err) {
      throw new Error('commentEdit validation')  
    }
  }

export const commentValidation = {
    commentCreate,
    commentNotExistId,
    commentEdit
  };