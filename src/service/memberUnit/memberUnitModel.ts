export interface MemberUnitSearchParams {
  isShow?: boolean;
  porCode?: string;
  fndCode?: string;
  carrier?: string;
  routeCode?: string;
  keyword?: string;
  sort?: string;
  order?: string;
  limit?: number;
  offset?: number;
  [key: string]: string | undefined | boolean | number;
}

export interface MemberUnitDetailType {
  id: string;
  name: string;
  logo: string | null;
  logoPath: string | null;
  address: string | null;
  memberLevel: number;
  unitLevel: number;
  establishmentDate: string | null;
  contactPhone: string;
  email: string;
  enterpriseDescription: string | null;
  advantageBusiness: string | null;
  images: { id: string; imagePath: string }[];
}

export interface MemberUnitCustomerType {
  id: string;
  avatarId: string;
  avatarPath: string;
  name: string;
  phone: string;
  position: string;
  email: string;
  createTime: string;
  updateTime: string;
}
