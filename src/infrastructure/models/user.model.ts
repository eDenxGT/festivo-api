import mongoose, { ObjectId, Schema } from 'mongoose';
import { IUser } from '../../domain/entities/user.entity';

export interface IUserModel extends Omit<IUser, 'id'>, Document {
  _id: ObjectId;
}

const userSchema = new Schema<IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export const UserModel = mongoose.model<IUserModel>('User', userSchema);
