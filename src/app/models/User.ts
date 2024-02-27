// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

let User: mongoose.Model<IUser>;

if (mongoose.connection.models.User) {
  User = mongoose.connection.models.User;
} else {
  User = mongoose.model<IUser>("User", userSchema);
}

export default User;
