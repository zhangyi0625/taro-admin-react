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
