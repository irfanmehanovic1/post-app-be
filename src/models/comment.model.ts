import { Model, model, Schema } from "mongoose";
import { IComment } from '../interfaces/comment.interface'

const commentSchema: Schema = new Schema({
  text: {
    maxlength: 1000, 
    trim: true, 
    type: String
  },
  date: {
    default: Date.now, 
    type: Date
  },
  author: {
    type: Schema.Types.ObjectId, ref: 'User' 
  },
  postRef: {
    type: Schema.Types.ObjectId, ref: 'Post'
  }
});

const COmment: Model<IComment> = model("Comment", commentSchema);

export default COmment;