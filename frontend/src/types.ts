export type LoginFormDataType = {
  username: string;
  password: string;
}

export type RegisterFormDataType = {
  username: string;
  password: string;
  cPassword: string;
}

export type RequestObject = LoginFormDataType | RegisterFormDataType;
