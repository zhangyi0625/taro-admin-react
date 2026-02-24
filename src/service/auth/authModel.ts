export interface LoginPasswordParams {
  password: string;
  phone: string;
}

export interface LoginPhoneParams {
  phone: string;
  code: string;
}

export interface LoginWXParams {
  wxPhoneCode?: string;
  wxCode: string;
}
