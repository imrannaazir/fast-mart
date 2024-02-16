import { Schema, model } from 'mongoose';
import { TName, TUser } from './user.interface';
import { Role } from './user.constant';
import { hashPassword } from '../auth/auth.utils';

const userNameSchema = new Schema<TName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: userNameSchema,
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: Role,
      default: 'user',
    },
    profileImage: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    passwordChangeAt: {
      type: Date,
      select: 0,
    },
  },
  {
    timestamps: true,
  },
);

// hash password using pre hook
userSchema.pre('save', async function () {
  this.password = await hashPassword(this.password);
});

// disallow password and password change at
userSchema.post('save', async function (doc, next) {
  doc.set('password', undefined);
  doc.set('passwordChangeAt', undefined);

  next();
});
const User = model<TUser>('user', userSchema);

export default User;
