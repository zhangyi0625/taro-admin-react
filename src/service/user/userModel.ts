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

export interface UserInfoParams {
  id?: string;
  phone: string;
  name: string;
  password: string;
  wxOpenid?: string;
  wxUnionid?: string;
  email: string | null;
  companyName: string | null;
  companyId: string | null;
  avatarId: string | null;
  avatarPath: string | null;
  position: string | null;
  companyMaster: boolean;
}
