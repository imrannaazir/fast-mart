import { TUpdateUserPayload } from '@repo/utils/types';
import User from './user.model';

const updateUserDetails = async (
  payload: TUpdateUserPayload,
  userId: string,
) => {
  const updatedUser = await User.findByIdAndUpdate(userId, payload);
  return updatedUser;
};

const UserServices = { updateUserDetails };
export default UserServices;
