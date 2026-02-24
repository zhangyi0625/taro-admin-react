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
