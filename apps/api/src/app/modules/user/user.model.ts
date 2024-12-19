import { Role, UserStatus } from '@repo/utils/constants';
import { TUser } from '@repo/utils/types';
import { Schema, model } from 'mongoose';
import { hashPassword } from '../auth/auth.utils';

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    photo: {
      type: Schema.Types.ObjectId,
      ref: 'image',
    },
    dateOfBirth: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: Object.keys(Role),
      default: 'USER',
    },
    status: {
      type: String,
      enum: Object.keys(UserStatus),
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  },
);

// hash password using pre hook
userSchema.pre('save', async function () {
  this.password = await hashPassword(this.password!);
});

// disallow password and password change at
userSchema.post('save', async function (doc, next) {
  doc.set('password', undefined);

  next();
});
const User = model<TUser>('user', userSchema);

export default User;
