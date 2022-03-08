import { Model, model, Schema } from "mongoose";
import { IUser } from '../interfaces/user.interface'

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  authenticationNumber: {
    type: Number,
    required: true,
    default: 0
  }
});

const User: Model<IUser> = model("User", userSchema);

export default User;