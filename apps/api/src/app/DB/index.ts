import { TUser } from '@repo/utils/types';
import config from '../config';
import User from '../modules/user/user.model';

const superAdminData: TUser = {
  email: config.super_admin.email as string,
  password: config.super_admin.password as string,
  role: 'SUPER_ADMIN',
  status: 'ACTIVE',
};

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({ role: 'SUPER_ADMIN' });

    if (!isSuperAdminExist) {
      await User.create(superAdminData);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
