import { Role, UserStatus } from '@repo/utils/constants';
import { TUser } from '@repo/utils/types';
import config from '../config';
import User from '../modules/user/user.model';

const superAdminData: TUser = {
  email: config.super_admin.email as string,
  password: config.super_admin.password as string,
  role: Role.SUPER_ADMIN,
  status: UserStatus.ACTIVE,
};

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({ role: Role.SUPER_ADMIN });

    if (!isSuperAdminExist) {
      await User.create(superAdminData);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

// keep server alive

export const keepServerAlive = () => {
  const minInterval = 12 * 60 * 1000; // 12 minutes
  const maxInterval = 14 * 60 * 1000; // 14 minutes
  function pingServer() {
    const interval = Math.floor(
      Math.random() * (maxInterval - minInterval + 1) + minInterval,
    );

    setTimeout(async () => {
      const response = await fetch(config.app_url as string);
      const data = (await response.json()) as Record<string, unknown>;
      if (data.success) {
        console.log(data.message as string);
      } else {
        console.log(`App has been died😒!`);
      }

      pingServer(); // Schedule the next ping
    }, interval);
  }

  pingServer(); // Start the ping cycle
};
