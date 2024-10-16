export type TLoginUser = {
  email: string;
  password: string;
};

export type TSession = {
  id: number;
  userId: string;
  sessionToken: string;
  expiresAt: Date;
  createAt: Date;
  updatedAt: Date;
};

export type TRefreshToken = {
  id: number;
  userId: string;
  token: string;
  expiresAt: Date;
  createAt: Date;
  updatedAt: Date;
};
