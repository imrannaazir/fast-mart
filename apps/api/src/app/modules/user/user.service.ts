import { Role } from '@repo/utils/constants';
import { TUpdateUserPayload } from '@repo/utils/types';
import QueryBuilder from '../../builder/QueryBuilder';
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

const getAllUsers = async (query: Record<string, unknown>) => {
  const userModelQuery = new QueryBuilder(
    User.find({
      role: Role.USER,
    }).populate('photo'),
    query,
  )
    .filter()
    .sort()
    .fields()
    .paginate();

  const data = await userModelQuery.modelQuery;
  const meta = await userModelQuery?.countTotal();
  return { data, meta };
};

const UserServices = { updateUserDetails, getMyData, getAllUsers };
export default UserServices;
