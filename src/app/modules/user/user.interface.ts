export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TRole = 'user';

export type TUser = {
  name?: TName;
  email: string;
  password: string;
  role?: TRole;
  profileImage?: string;
  phoneNumber?: string;
  passwordChangeAt: Date;
};
