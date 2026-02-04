export interface MemberUnitSearchParams {
  isShow?: boolean;
  porCode?: string;
  fndCode?: string;
  carrier?: string;
  routeCode?: string;
  keyword?: string;
  sort?: string;
  order?: string;
  [key: string]: string | undefined | boolean;
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
  images: { id: string }[];
}

export interface IndustryNewsDetailType {
  id: string;
  content: string;
  mainImage: string;
  mainImagePath: string;
  groupName: string;
  createTime: string;
  updateTime: string;
  title: string;
  groupId: string;
  url: string;
}

export interface UnitGeneralIndustryColumnType {
  id: string;
  name: string;
  url: string;
  content: string;
  columnName: string;
  groupName: string;
  imageIds: string;
  imagePath: string[];
}

export interface MemberUnitCustomerType {
  id: string;
  avatarId: string;
  name: string;
  phone: string;
  position: string;
  email: string;
  createTime: string;
  updateTime: string;
}
