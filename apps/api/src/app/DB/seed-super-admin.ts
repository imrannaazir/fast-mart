import { Role, UserStatus } from '@repo/utils/constants';
import { TUser } from '@repo/utils/types';
import mongoose from 'mongoose';
import config from '../config';
import User from '../modules/user/user.model';

export const seedSuperAdmin = async () => {
  console.log('Start super admin seeding!');

  const superAdminData: TUser = {
    firstName: 'Mr.',
    lastName: 'Admin',
    email: config.super_admin.email as string,
    password: config.super_admin.password!,
    phoneNumber: config.super_admin?.phone_number,
    role: Role.SUPER_ADMIN,
    status: UserStatus.ACTIVE,
  };
  try {
    await User.updateOne({ role: Role.SUPER_ADMIN }, superAdminData, {
      upsert: true,
    });

    console.log('Super admin seeded!');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
const seed = async () => {
  console.log('Seeding started!');
  try {
    await mongoose.connect(config.database_url!);

    await seedSuperAdmin();
  } catch (error: any) {
    console.log(error?.message || error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('seeding completed.');
  }
};
seed();
