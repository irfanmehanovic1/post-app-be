import { Model, model, Schema } from "mongoose";
import { IPost } from '../interfaces/post.interface'

const postSchema: Schema = new Schema({
  title: {
    maxlength: 100, 
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
  description: {
    maxlength: 3000, 
    trim: true, 
    type: String
  }
});

const Post: Model<IPost> = model("Post", postSchema);

export default Post;