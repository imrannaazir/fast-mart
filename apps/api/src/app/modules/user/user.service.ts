import { TUpdateUserPayload } from '@repo/utils/types';
import User from './user.model';

const updateUserDetails = async (
  payload: TUpdateUserPayload,
  userId: string,
) => {
  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  return updatedUser;
};

const getMyData = async (userId: string) => {
  const data = await User.findById(userId).populate('photo');
  return data;
};

const UserServices = { updateUserDetails, getMyData };
export default UserServices;
