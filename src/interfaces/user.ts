export interface AUTH_REGISTER {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AUTH_LOGIN {
  email: string;
  password: string;
}

export interface USER_RESPONSE {
  _id: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  status: string;
  updatedAt: string;
}
